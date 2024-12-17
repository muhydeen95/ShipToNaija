import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WebappComponent } from './webapp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '',
    component: WebappComponent,
    children: [
      {
        path: 'dashboard',
        data: { breadcrumb: 'Dashboard' },
        loadChildren: () =>
          import('@components/webapp/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },

      {
        path: 'shipment',
        data: { breadcrumb: 'Shipment' },
        loadChildren: () =>
          import(
            '@components/webapp/shipment/shipment.module'
          ).then((m) => m.ShipmentModule),
      },

      {
        path: 'settings',
        data: { breadcrumb: 'Roles & Access' },
        loadChildren: () =>
          import('@components/webapp/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebappRoutingModule {}
