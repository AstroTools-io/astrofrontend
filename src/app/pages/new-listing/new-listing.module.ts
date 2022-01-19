import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { NewListingRoutingModule } from './new-listing-routing.module';
import { NewListingComponent } from './new-listing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NewListingRoutingModule,
  ],
  declarations: [NewListingComponent],
})
export class NewListingModule {}
