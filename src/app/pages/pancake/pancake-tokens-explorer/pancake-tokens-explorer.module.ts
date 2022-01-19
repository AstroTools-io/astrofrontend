import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { PankcakeTokensExplorerComponent } from './pancake-tokens-explorer.component';
import { PankcakeTokensExplorerRoutingModule } from './pancake-tokens-explorer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PankcakeTokensExplorerRoutingModule,
  ],
  declarations: [PankcakeTokensExplorerComponent],
})
export class PankcakeTokensExplorerModule {}
