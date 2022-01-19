import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { PairDTO, TokenDTO } from '../../models/pairDTO';
import { LocalStorageService } from '../../services/local-storage.service';
import { TokenService } from '../../services/token.service';
import { WETH, USDT, USDC, DAI } from '../../shared/utils/utils';

const TOKEN_QUERY = gql`
  query CurrentTokenData(
    $pairId: ID!
  ) {
    pair(id: $pairId) {
      id
      createdAtTimestamp
      reserve0
      reserve1
      txCount
      token0 {
        id
        decimals
        symbol
        name
      }
      token1 {
        id
        decimals
        symbol
        name
      }
    }
  }
`;

@Component({
  selector: 'app-multi-swap',
  templateUrl: './multi-swap.component.html',
  styleUrls: ['./multi-swap.component.scss'],
})
export class MultiSwapComponent implements AfterViewInit, OnDestroy, OnInit {
  tokens: TokenDTO[] = [];
  tokenIsFirstInPair = false;

  isSearching = false;
  searchString: BehaviorSubject<string>;

  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];

  private query: QueryRef<any>;
  private loading = true;
  private error: any;

  private ngUnsubscribe: Subject<void> = new Subject();

  nzFilterOption = () => true;

  get isPancake() {
    return this.router.url.indexOf('pancake') > -1;
  }

  constructor(
    public sanitizer: DomSanitizer,
    private apollo: Apollo,
    private currencyPipe: CurrencyPipe,
    private localStorage: LocalStorageService,
    private renderer: Renderer2,
    private router: Router,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(): void {
    this.searchString = new BehaviorSubject('');

    this.searchString
      .pipe(
        filter((res) => res.length > 1),
        debounceTime(1200),
        distinctUntilChanged()
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.isSearching = true;

        this.listOfOption = [];
        if (this.isPancake) {
          this.tokenService.getPairFromSearchStringBEP(value)
            .pipe(takeUntil(this.ngUnsubscribe))
            .pipe(catchError((err: any) => {
              console.log('getPairFromSearchStringBEP: ', err);
              return throwError(err);
            }))
            .subscribe((res: PairDTO[]) => {
              const listOfOption: Array<{ value: string; text: string }> = [];
              if (res && res.length > 0) {
                res.forEach((pair: PairDTO) => {
                  this.listOfOption = res.map((opt: any) => ({
                    value: opt.adressPair,
                    text: `${opt.namePair} (${opt.nameToken})`,
                  }));
                  this.pushTokensBSC(pair, listOfOption);
                });
              }
              this.isSearching = false;
            });
        } else {
          this.tokenService.getPairFromSearchStringERC(value)
            .pipe(takeUntil(this.ngUnsubscribe))
            .pipe(catchError((err: any) => {
              console.log('getPairFromSearchStringERC: ', err);
              return throwError(err);
            }))
            .subscribe((res: PairDTO[]) => {
              const listOfOption: Array<{ value: string; text: string }> = [];
              const pair = res && res[0];
              if (pair) {
                res.forEach((p: PairDTO) => {
                  this.pushTokens(p, listOfOption);
                });
              }
              this.isSearching = false;
            });
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const allEles: any = document.querySelectorAll(
        'nz-select nz-select-top-control nz-select-search input'
      );
      for (const ele of allEles) {
        this.renderer.removeAttribute(ele, 'readonly');
      }
    }, 1500);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  search(value: string) {
    this.searchString.next(value);
  }

  formatToCurrency(value: number) {
    return this.currencyPipe.transform(
      Math.round(value),
      'USD',
      'symbol',
      '1.0-0'
    );
  }

  searchSelected() {
    const tokenId: TokenDTO = this.selectedValue.toLocaleLowerCase();

    this.query = this.apollo.watchQuery({
      query: TOKEN_QUERY,
      variables: {
        pairId: tokenId,
      },
    });

    this.query.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(catchError((err: any) => {
        console.log('Query Error, retrying 🎁', err);
        return throwError(err);
      }))
      .subscribe(async (result) => {
        this.tokenIsFirstInPair =
          result.data.pair.token1.id === WETH ||
          result.data.pair.token1.id === USDT ||
          result.data.pair.token1.id === USDC ||
          result.data.pair.token1.id === DAI;
        this.tokens.push(
          !this.tokenIsFirstInPair
            ? result.data.pair.token1
            : result.data.pair.token0
        );

        this.loading = result.loading;
        this.error = result.error;

        this.selectedValue = '';
      });
  }

  onBlur() {
    setTimeout(() => {
      const allEles: any = document.querySelectorAll(
        'nz-select nz-select-top-control nz-select-search input'
      );
      for (const ele of allEles) {
        this.renderer.removeAttribute(ele, 'readonly');
      }
    }, 500);
  }

  getUniUrl(token: TokenDTO) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.uniswap.org/#/swap?outputCurrency=' +
      token.id +
      '&theme=' +
      this.localStorage.theme
    );
  }

  private pushTokens(pair: any, listOfOption) {
    const token = { value: pair.id, text: '' };
    const volumeTxt = +pair.volumeUSD > 0
      ? ` Vol: ${this.formatToCurrency(pair.volumeUSD)}`
      : '';
    token.text = pair.token0.id === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      ? `${pair.token1.symbol} (${pair.token1.name})${volumeTxt}`
      : `${pair.token0.symbol} (${pair.token0.name})${volumeTxt}`;

    listOfOption.push(token);
    this.listOfOption = listOfOption;
  }

  private pushTokensBSC(pair: any, listOfOption) {
    const token = { value: pair.id, text: '' };
    const volumeTxt = +pair.volumeUSD > 0
      ? `${this.formatToCurrency(pair.volumeUSD)}`
      : '';
    token.text = pair.token0.id === '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
      ? `${pair.token0.symbol}-${pair.token1.symbol} (${pair.token1.name}) ${volumeTxt}`
      : `${pair.token0.symbol}-${pair.token1.symbol} (${pair.token0.name}) ${volumeTxt}`;

    listOfOption.push(token);
    this.listOfOption = listOfOption;
  }
}
