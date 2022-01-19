import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MomentModule } from 'ngx-moment';

import { IconsProviderModule } from '../icons-provider.module';
import { AddressTradesComponent } from './components/address-trades/address-trades.component';
import { ListingComponent } from './components/listing/listing.component';
import { PairSearchComponent } from './components/pair-search/pair-search.component';
import { TvChartComponent } from './components/tv-chart/tv-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzAvatarModule,
    NzDropDownModule,
    NzLayoutModule,
    NzSelectModule,
    NzTagModule,
    NzTableModule,
    NzToolTipModule,
    MomentModule,
    IconsProviderModule,
  ],
  declarations: [
    AddressTradesComponent,
    ListingComponent,
    PairSearchComponent,
    TvChartComponent,
  ],
  exports: [
    NzAlertModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzDividerModule,
    NzDrawerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzModalModule,
    NzNotificationModule,
    NzSelectModule,
    NzTableModule,
    NzTagModule,
    NzTimePickerModule,
    NzToolTipModule,
    MomentModule,
    ReactiveFormsModule,
    IconsProviderModule,
    AddressTradesComponent,
    ListingComponent,
    PairSearchComponent,
    TvChartComponent,
  ],
  providers: [CurrencyPipe],
})
export class SharedModule {}
