import { Component } from '@angular/core';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar-toggler',
  templateUrl: './sidebar-toggler.component.html',
  styleUrls: ['./sidebar-toggler.component.scss'],
})
export class SidebarTogglerComponent {
  constructor(public sidebarService: SidebarService) {}
}
