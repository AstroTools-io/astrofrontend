import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { NewListingPancakeRoutingModule } from './new-listing-pancake-routing.module';
import { NewListingPancakeComponent } from './new-listing-pancake.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NewListingPancakeRoutingModule,
  ],
  declarations: [NewListingPancakeComponent],
})
export class NewListingPancakeModule {}
