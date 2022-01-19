import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiSwapComponent } from './multi-swap.component';

const routes: Routes = [{ path: '', component: MultiSwapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiSwapRoutingModule {}
