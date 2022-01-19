import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { EtherService } from './ether.service';
import { LocalStorageService } from './local-storage.service';
import { EtherScanAccountInfo } from '../models/etherScanAccountInfo';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accountInfo$: BehaviorSubject<EtherScanAccountInfo[]> = new BehaviorSubject(
    []
  );
  accountInfo: EtherScanAccountInfo[] = [];
  intervalAccountInfo;
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private notification: NzNotificationService,
    private etherService: EtherService
  ) {
    this.etherService.connectedAddress$.subscribe((res) => {
      this.accountInfo = [];
      this.accountInfo$.next(this.accountInfo);
    });
  }

  observeAccountInfo(address: string, startblock = '0') {
    if (!address) {
      address = this.etherService.connectedAddress;
    }
    this.accountInfo = [];
    this.accountInfo$.next(this.accountInfo);
    if (this.intervalAccountInfo) {
      clearInterval(this.intervalAccountInfo);
    }
    this.getAccountInfo(address);
    this.intervalAccountInfo = setInterval(() => {
      const bNumber = this.accountInfo && this.accountInfo.length
        ? this.accountInfo[0].blockNumber + 1
        : '0';
      this.getAccountInfo(address, bNumber, false);
    }, 6000);
  }

  observeMyAccount(startblock = '0') {
    this.accountInfo = [];
    this.accountInfo$.next(this.accountInfo);
    if (this.intervalAccountInfo) {
      clearInterval(this.intervalAccountInfo);
    }
    this.getAccountInfo(this.etherService.connectedAddress, '0', true, false);
    this.intervalAccountInfo = setInterval(() => {
      const bNumber = this.accountInfo && this.accountInfo.length
        ? +this.accountInfo[0].blockNumber + 1
        : '0';
      this.getAccountInfo(
        this.etherService.connectedAddress,
        bNumber.toString(),
        false,
        false
      );
    }, 6000);
  }

  getAccountInfo(
    address: string,
    startblock = '0',
    init = true,
    notification = true
  ) {
    const url = environment.api.etherscan.addressToken
      .replace('{address}', address)
      .replace('{startblock}', startblock);
    return this.http.get<any>(url).subscribe((res) => {
      const result: EtherScanAccountInfo[] = res.result;
      this.accountInfo = [...this.accountInfo, ...result]
        .filter((obj, pos, arr) => {
          return arr.map((mapObj) => mapObj.hash).indexOf(obj.hash) === pos;
        })
        .sort((a, b) => +b.blockNumber - +a.blockNumber);
      this.accountInfo$.next(this.accountInfo);
      if (!init && result && result.length && notification) {
        const upAudio = document.getElementById(
          'notification-up'
        ) as HTMLMediaElement;

        upAudio.volume = 0.4;
        upAudio.play();
        this.notification
          .blank(`🟢 ${result[0].tokenSymbol}`, `${result[0].tokenName}`, {
            nzDuration: 0,
          })
          .onClick.subscribe(() => {});
      }
    });
  }

  async getPairIdForTokenSymbol(tokenSymbol: string) {
    const url = environment.api.astro.tokenInfo.replace(
      '{tokenName}',
      tokenSymbol
    );
    let id = null;
    await this.http
      .get<any>(url)
      .toPromise()
      .then(async (res) => {
        if (res && res.length) {
          const url2 = environment.api.astro.pairInfo.replace(
            '{tokenId}',
            res[0].id
          );
          await this.http
            .get<any>(url2)
            .toPromise()
            .then((res2) => {
              if (res2 && res2.length) {
                id = res2[0].id;
              }
            });
        }
      });
    return id;
  }
}
