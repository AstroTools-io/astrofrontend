import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgResizeObserver, ngResizeObserverProviders } from 'ng-resize-observer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { combineLatest, of } from 'rxjs';
import { switchMap, map, delay, tap } from 'rxjs/operators';

import { Favorite } from './models/favorites';
import { EtherService } from './services/ether.service';
import { LocalStorageService } from './services/local-storage.service';
import { TokenService } from './services/token.service';
import { popupCenter } from './shared/utils/utils';
import { ChartToken } from './models/chartToken';
import { SwapDTO } from './models/swapDTO';

interface AudioItem {
  id: string;
  src: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ngResizeObserverProviders],
})
export class AppComponent implements OnInit, OnDestroy {
  audioItems: AudioItem[];

  interval;
  interval2;
  user;

  savedPairs$;
  saved$;

  health = '';

  mostRecentTimestamp: any = {};

  constructor(
    public etherService: EtherService,
    public localStorage: LocalStorageService,
    public tokenService: TokenService,
    private notification: NzNotificationService,
    private resize$: NgResizeObserver,
  ) {
    this.audioItems = [
      {
        id: 'notification-up',
        src: '/assets/sounds/smb_up.wav',
      },
      {
        id: 'notification-down',
        src: '/assets/sounds/smb_down.wav',
      },
      {
        id: 'new-listing',
        src: '/assets/sounds/zelda_-_secret.mp3',
      },
    ];
  }

  get getBuyUrl() {
    const amount = this.etherService.noAstro || this.etherService.astroTier1 ? 1000 : 20000;
    return `https://app.uniswap.org/#/swap?outputCurrency=0xcbd55d4ffc43467142761a764763652b48b969ff&exactAmount=${amount}&exactField=output&theme=dark'`;
  }

  async ngOnInit(): Promise<void> {
    this.checkDarkMode();
    this.etherService.getBalances();

    this.tokenService.resize$ = this.resize$.pipe(
      map(({ contentRect }) => contentRect)
    );

    this.tokenService.getEthPrice();
    this.savedPairs$ = this.tokenService.savedPairs$;

    this.savedPairs$.subscribe((sp) => {
      if (!sp || !sp.length) {
        this.tokenService.savePair({
          id: '0x7df4a1d4a8d8390bef36f311252423cce04e5647',
          tokenId: '0xcbd55d4ffc43467142761a764763652b48b969ff',
          name: 'ASTRO',
          priceUSD: 0,
          priceETH: 0,
          higherSavedPrice: null,
          lowerSavedPrice: null,
        });
      }
    });

    this.saved$ = this.tokenService.savedPairs$.pipe(
      switchMap((favorites: Favorite[]) => {
        if (!(favorites && favorites.length)) {
          return of(null);
        }

        return combineLatest(favorites.map((favToken: Favorite) => {
          const query = this.tokenService.getSwapPrice(
            favToken.id,
            this.mostRecentTimestamp[favToken.id] || 0,
            1757605586
          );

          this.interval = setInterval(() => {
            query.refetch();
          }, 60000);

          return query.valueChanges.pipe(
            delay(800),
            map((result: any) => {
              const formattedSwap = this.buildSwaps(result, favToken)
                .sort((a, b) =>
                  b.date - a.date ||
                  b.type.localeCompare(a.type) ||
                  b.priceUSD - a.priceUSD
                );

              this.mostRecentTimestamp[favToken.id] = formattedSwap[0].date;

              return {
                ...favToken,
                priceUSD: formattedSwap[0].priceUSD,
                priceETH: formattedSwap[0].priceETH,
              };
            }),
          );
        }))
          .pipe(tap(this.checkAlerts));
      })
    );

    const queryHealthy = this.tokenService.getGraphHealth('uniswap/uniswap-v2');

    queryHealthy.valueChanges.subscribe((res: any) => {
      if (res) {
        const changed = res.data.indexingStatusForCurrentVersion.health !== this.health;
        this.health = res.data.indexingStatusForCurrentVersion.health;

        if (changed && this.health !== 'healthy') {
          this.notification
            .blank(
              `We are experiencing API connection issues`,
              `Data may be delayed. AstroTools team is working on a solution. We thank you for your patience`,
              { nzDuration: 0 }
            )
            .onClick
            .subscribe(() => {
              console.log('notification clicked!');
            });
        }
      }
    });

    this.interval2 = setInterval(() => {
      queryHealthy.refetch();
    }, 120000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }

  connect() {
    this.etherService.enableMetaMaskAccount();
  }

  walletConnect() {
    this.etherService.enableWalletConnect();
  }

  getAccountAndBalance = () => {
    const that = this;
    this.etherService
      .getUserBalance()
      .then((retAccount: any) => {
        that.user.address = retAccount.account;
        that.user.balance = retAccount.balance;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkAlerts(favorites: any) {
    const upAudio = document.getElementById(
      'notification-up'
    ) as HTMLMediaElement;
    const downAudio = document.getElementById(
      'notification-down'
    ) as HTMLMediaElement;

    upAudio.volume = downAudio.volume = 0.7;
    favorites.forEach((fav) => {
      if (!fav.priceUSD) {
        return;
      }

      if (fav.higherSavedPrice && fav.priceUSD >= fav.higherSavedPrice) {
        upAudio.play();
        const tempFav = { ...fav, higherSavedPrice: null };
        this.tokenService.savePair(tempFav);
        this.notification
          .blank(
            `🟢 ${fav.name}`,
            `${fav.name} went up to $${fav.higherSavedPrice}`,
            { nzDuration: 0 }
          )
          .onClick
          .subscribe(() => {
            console.log('notification clicked!');
          });
      } else if (fav.lowerSavedPrice && fav.priceUSD <= fav.lowerSavedPrice) {
        downAudio.play();
        // audio.volume = 0.2;
        const tempFav = { ...fav, lowerSavedPrice: null };
        this.tokenService.savePair(tempFav);
        this.notification
          .blank(
            `🔴 ${fav.name}`,
            `${fav.name} went down to $${fav.lowerSavedPrice}`,
            { nzDuration: 0 }
          )
          .onClick
          .subscribe(() => {
            console.log('notification clicked!');
          });
      }
    });
  }

  getPercentageChange(fav: Favorite) {
    return fav.myEntry
      ? Math.round(((fav.priceUSD - fav.myEntry) / fav.myEntry) * 10000) / 100
      : 0;
  }

  removePair(event, fav: Favorite) {
    event.stopPropagation();
    this.tokenService.removePair(fav);
  }

  toggleDarkMode() {
    const el1 = document.getElementById('dark-reader') as any;
    if (el1.disabled) {
      el1.disabled = false;
      localStorage.setItem('darkreader', 'enabled');
      this.localStorage.setDarkMode(true);
    } else {
      el1.disabled = true;
      localStorage.setItem('darkreader', 'disabled');
      this.localStorage.setDarkMode(false);
    }
  }

  checkDarkMode() {
    const el1 = document.getElementById('dark-reader') as any;
    if (localStorage.getItem('darkreader') === 'disabled') {
      el1.disabled = true;
      this.localStorage.setDarkMode(false);
    } else {
      el1.disabled = false;
      this.localStorage.setDarkMode(true);
    }
  }

  openMyZerion() {
    popupCenter({
      url: 'https://app.zerion.io/' + this.etherService.account + '/overview',
      title: 'My Zerion',
      w: 900,
      h: 620,
    });
    return false;
  }

  buildSwaps(res: any, fav: Favorite): ChartToken[] {
    // Wait for uni fix !
    return res.data.swaps
      .filter(
        (s: SwapDTO) =>
          s.transaction.id !== '0xb1af4a63eecc9d36e86c8a2a939c0e56cf6e16d087b8b928c9874aaef9489985' &&
          (s.pair.token0.symbol === fav.name || s.pair.token1.symbol === fav.name)
      )
      .map((sw) => {
        const tokenIsFirstInPair = fav.name === sw.pair.token0.symbol;
        const ethAmount = tokenIsFirstInPair
          ? sw.amount1In > sw.amount1Out
            ? sw.amount1In
            : sw.amount1Out
          : sw.amount0In > sw.amount0Out
            ? sw.amount0In
            : sw.amount0Out;
        const tokenAmount = tokenIsFirstInPair
          ? sw.amount0In > sw.amount0Out
            ? sw.amount0In
            : sw.amount0Out
          : sw.amount1In > sw.amount1Out
            ? sw.amount1In
            : sw.amount1Out;
        return {
          date: +sw.timestamp,
          type: tokenIsFirstInPair
            ? sw.amount1In > 0
              ? 'buy'
              : 'sell'
            : sw.amount0In > 0
              ? 'buy'
              : 'sell',
          priceUSD: sw.amountUSD / tokenAmount,
          priceETH: ethAmount / tokenAmount,
        } as ChartToken;
      });
  }
}
