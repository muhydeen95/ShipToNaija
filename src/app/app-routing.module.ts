import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './@components/page-not-found/page-not-found.component';
import { UnauthorizedPageComponent } from './@components/unauthorized-page/unauthorized-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },

  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },

  {
    path: 'unauthorized-page',
    component: UnauthorizedPageComponent,
  },

  {
    path: 'app',
    data: { breadcrumb: 'Webapp' },
    loadChildren: () =>
      import('app/@components/webapp/webapp.module').then(
        (m) => m.WebappModule
      ),
  },

  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 80],
  onSameUrlNavigation: 'reload',
  // enableTracing: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
