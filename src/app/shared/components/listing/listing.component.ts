import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ColumnItem } from 'src/app/models/columnItem';
import { NewPairs } from 'src/app/models/new-pairs';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, OnDestroy {
  @Input() isPancake = false;

  listOfColumns: ColumnItem[] = [
    { name: 'Creation date' },
    { name: 'Token' },
    { name: 'Price (USD)' },
    // { name: 'Initial / Current Pool token' },
    { name: 'Initial / Current Pool ETH' },
    { name: 'Market Cap' },
    { name: 'Tx Count' },
    { name: 'Price Change' },
    { name: 'Holders' },
    { name: 'Actions' },
    { name: 'Contract' },
  ];

  currentPairs: NewPairs[] = [];
  currentPairs$: BehaviorSubject<NewPairs[]> = new BehaviorSubject([]);

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private notification: NzNotificationService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.isPancake) {
      this.listOfColumns.splice(7, 1);
    }

    this.fetchData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  removeDuplicateSwaps(myArr) {
    return myArr
      .filter((obj, pos, arr) => arr.map((mapObj) => mapObj.idToken).indexOf(obj.idToken) === pos)
      .sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);
  }

  formatDate(timestamp: number) {
    return new Date(+timestamp * 1000);
  }

  getPriceChange(newPair: any) {
    return (
      ((newPair.currentInfos.currentPriceUSD -
        newPair.initialInfos.initialPriceUSD) /
        newPair.initialInfos.initialPriceUSD) *
      100
    );
  }

  notify(newPair: NewPairs) {
    const upAudio = document.getElementById('new-listing') as HTMLMediaElement;
    upAudio.volume = 0.7;
    upAudio.play();

    const message = newPair.holderCount
      ? `${newPair.tokenName} with ${newPair.holderCount} holders just listed`
      : `${newPair.tokenName} just listed`;

    this.notification
      .blank(`NEW LISTING - ${newPair.tokenName}`, message, { nzDuration: 0 })
      .onClick
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        console.log('notification clicked!');
      });
  }

  identify(index, item: NewPairs) {
    return item.idPair;
  }

  private fetchData() {
    const action = !this.isPancake
      ? this.tokenService.getERCTokens(this.currentPairs)
      : this.tokenService.getPancakeTokens(this.currentPairs);

    action
      .pipe(
        tap((res) => {
          if (
            this.currentPairs &&
            this.currentPairs.length &&
            res &&
            res.length
          ) {
            this.notify(res[0]);
          }
        }),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((res) => {
        this.currentPairs = [...this.currentPairs, ...res];
        this.currentPairs = this.removeDuplicateSwaps([...this.currentPairs]);
        this.currentPairs$.next(this.currentPairs);
        setTimeout(() => this.fetchData(), 6000);
      });
  }
}
