import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { WhaleAlertComponent } from './whale-alert.component';
import { WhaleAlertRoutingModule } from './whale-alert-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    WhaleAlertRoutingModule,
  ],
  declarations: [WhaleAlertComponent],
})
export class WhaleAlertModule {}
