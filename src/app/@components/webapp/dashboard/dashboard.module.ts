import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SvgModule } from '@core/shared/svg/svg.module';
import { DashboardComponent } from './dashboard.component';
import { AnalyticCardComponent } from './analytic-card/analytic-card.component';
import { OngoingSurveyCardComponent } from './ongoing-survey-card/ongoing-survey-card.component';
import { StatusModule } from '@directives/status/status.module';
import { TableLoaderModule } from '@core/shared/loaders/table-loader/table-loader.module';
import { ShippingListComponent } from './shipping-list/shipping-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SearchbarModule } from '@core/shared/searchbar/searchbar.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticCardComponent,
    OngoingSurveyCardComponent,
    ShippingListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SvgModule,
    StatusModule,
    TableLoaderModule,
    MatTableModule,
    MatSortModule,
    MatRippleModule,
    MatMenuModule,
    NgxChartsModule,
    SearchbarModule
  ],
})
export class DashboardModule {}
