import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BscToken } from 'src/app/models/bscToken';
import { ColumnItem } from 'src/app/models/columnItem';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-bsc-new-listing',
  templateUrl: './bsc-new-listing.component.html',
  styleUrls: ['./bsc-new-listing.component.scss'],
})
export class BscNewListingComponent implements OnInit, OnDestroy {
  newTokens$: Observable<BscToken[]>;

  listOfColumns: ColumnItem[] = [
    {
      name: 'Creation date',
    },
    {
      name: 'Token name',
    },
    {
      name: 'Holders',
    },
    {
      name: 'Links',
    },
  ];

  sub: Subscription;
  currentPairs: BscToken[];
  interval;

  constructor(
    private tokenService: TokenService,
    private notification: NzNotificationService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.newTokens$ = this.tokenService.getBscTokens().pipe(
      tap((res) => {
        if (
          this.currentPairs &&
          res &&
          this.currentPairs[0].tokenId !== res[0].tokenId
        ) {
          this.notify(res[0]);
        }
      })
    );

    this.interval = setInterval(() => {
      this.sub = this.newTokens$.subscribe((res) => (this.currentPairs = res));
    }, 8000);
  }

  formatDate(timestamp: number) {
    return new Date(+timestamp * 1000);
  }

  identify(index, item: BscToken) {
    return item.tokenId;
  }

  notify(newPair: BscToken) {
    const upAudio = document.getElementById('new-listing') as HTMLMediaElement;
    upAudio.volume = 0.7;
    upAudio.play();

    this.notification
      .blank(
        `NEW TOKEN - ${newPair.tokenName}`,
        `New token activity: ${newPair.tokenName}`,
        { nzDuration: 0 }
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }

  formatLinkCG(link: string, type: string) {
    return this.sanitizer.bypassSecurityTrustUrl(
      (type === 'CG'
        ? 'https://www.coingecko.com/en/coins/'
        : 'https://coinmarketcap.com/currencies/') + link.trim()
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
