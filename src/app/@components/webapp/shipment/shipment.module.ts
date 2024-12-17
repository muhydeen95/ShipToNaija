import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentComponent } from './shipment.component';
import { SearchbarModule } from '@core/shared/searchbar/searchbar.module';
import { MatMenuModule } from '@angular/material/menu';
import { SvgModule } from '@core/shared/svg/svg.module';
import { StatusModule } from '@directives/status/status.module';
import { TableLoaderModule } from '@core/shared/loaders/table-loader/table-loader.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule, Routes } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@core/shared/shared.module';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterDialogComponent } from './dialogs/filter-dialog/filter-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ShipmentInfoComponent } from './dialogs/shipment-info/shipment-info.component';

const routes: Routes = [
  {
    path: '',
    data: { permissions: ['Shipment'] },
    component: ShipmentComponent,
  },
  {
    path:'create',
    loadChildren: () =>
      import(
        '@components/webapp/shipment/create-shipment/create-shipment.module'
      ).then((m) => m.CreateShipmentModule),
  }
];

@NgModule({
  declarations: [
    ShipmentComponent,
    ShipmentListComponent,
    FilterDialogComponent,
    ShipmentInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRippleModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    TableLoaderModule,
    StatusModule,
    SvgModule,
    MatMenuModule,
    SearchbarModule,
    SharedModule,
  ],
})
export class ShipmentModule { }
