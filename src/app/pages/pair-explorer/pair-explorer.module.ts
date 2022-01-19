import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { PairExplorerRoutingModule } from './pair-explorer-routing.module';
import { PairExplorerComponent } from './pair-explorer.component';
import { TokenInfoComponent } from './token-info/token-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PairExplorerRoutingModule,
  ],
  declarations: [
    PairExplorerComponent,
    TokenInfoComponent,
  ],
  exports: [PairExplorerComponent],
})
export class PairExplorerModule {}
