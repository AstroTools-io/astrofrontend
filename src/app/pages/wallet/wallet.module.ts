import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WalletComponent } from './wallet.component';
import { WalletRoutingModule } from './wallet-routing.module';

@NgModule({
  imports: [SharedModule, WalletRoutingModule, CommonModule],
  declarations: [WalletComponent],
  exports: [WalletComponent]
})
export class WalletModule { }
