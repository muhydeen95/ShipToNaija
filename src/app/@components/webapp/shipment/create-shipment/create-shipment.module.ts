import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateShipmentComponent } from './create-shipment.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { SvgModule } from '@core/shared/svg/svg.module';
import { MatMenuModule } from '@angular/material/menu';
import { SearchbarModule } from '@core/shared/searchbar/searchbar.module';
import { SharedModule } from '@core/shared/shared.module';
import { AddressInfoComponent } from './address-info/address-info.component';
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';
import { AddBoxItemComponent } from './shipment-detail/dialogs/add-box-item/add-box-item.component';
import { NoticeDialogComponent } from './shipment-detail/dialogs/notice-dialog/notice-dialog.component';
import { ShipmentSummaryComponent } from './shipment-summary/shipment-summary.component';

const routes: Routes = [
  {
    path: '',
    data: { permissions: ['Create Shipment'] },
    component: CreateShipmentComponent,
  },
];

@NgModule({
  declarations: [CreateShipmentComponent, AddressInfoComponent, ShipmentDetailComponent, AddBoxItemComponent, NoticeDialogComponent, ShipmentSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatRippleModule,
    MatTableModule,
    MatTabsModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSelectModule,
    SvgModule,
    MatMenuModule,
    SearchbarModule,
    SharedModule,
  ],
})
export class CreateShipmentModule { }
