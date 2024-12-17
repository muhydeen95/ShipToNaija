import { NgModule } from '@angular/core';
import { SharedModule } from '@core/shared/shared.module';
import { WebappComponent } from './webapp.component';
import { WebappRoutingModule } from './webapp-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SvgModule } from '@core/shared/svg/svg.module';
import { SidebarTogglerComponent } from './components/sidebar-toggler/sidebar-toggler.component';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    WebappComponent,
    SidebarComponent,
    NavbarComponent,
    SidebarTogglerComponent,
  ],
  imports: [
    SharedModule,
    WebappRoutingModule,
    SvgModule,
    MatTooltipModule,
    MatRippleModule,
    MatMenuModule,
    OverlayModule,
    A11yModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [],
})
export class WebappModule {}
