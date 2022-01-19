import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MultiSwapComponent } from './multi-swap.component';
import { MultiSwapRoutingModule } from './multi-swap-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiSwapRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    MultiSwapComponent,
  ],
  exports: [MultiSwapComponent],
})
export class MultiSwapModule {}
