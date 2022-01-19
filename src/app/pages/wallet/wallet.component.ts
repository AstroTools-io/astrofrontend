import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { ColumnItem } from '../../models/columnItem';
import { WalletToken } from '../../models/WalletToken';
import { EtherService } from '../../services/ether.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  listOfColumns: ColumnItem[] = [];

  constructor(
    public tokenService: TokenService,
    public etherService: EtherService,
    public localStorage: LocalStorageService,
    private notification: NzNotificationService,
  ) {
    this.listOfColumns = [
      {
        name: 'Tokens',
        sortFn: (a: WalletToken, b: WalletToken) => a.symbol.localeCompare(b.symbol),
      },
      {
        name: 'Balance',
        sortFn: (a: WalletToken, b: WalletToken) => a.amount * a.price - b.amount * b.price,
      },
    ];
  }

  ngOnInit() {
  }

  identify(index, item: WalletToken) {
    return item.symbol;
  }
}
