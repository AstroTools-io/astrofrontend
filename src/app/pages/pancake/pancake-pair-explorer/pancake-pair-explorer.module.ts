import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { PancakePairExplorerRoutingModule } from './pancake-pair-explorer-routing.module';
import { PancakePairExplorerComponent } from './pancake-pair-explorer.component';
import { TokenInfoComponent } from './token-info/token-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PancakePairExplorerRoutingModule,
  ],
  declarations: [PancakePairExplorerComponent, TokenInfoComponent],
  exports: [PancakePairExplorerComponent],
})
export class PancakePairExplorerModule {}
