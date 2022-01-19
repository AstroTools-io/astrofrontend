import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { TokensExplorerComponent } from './tokens-explorer.component';
import { TokensExplorerRoutingModule } from './tokens-explorer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TokensExplorerRoutingModule,
  ],
  declarations: [TokensExplorerComponent],
})
export class TokensExplorerModule {}
