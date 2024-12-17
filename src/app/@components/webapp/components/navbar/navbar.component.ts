import { Component, OnInit } from '@angular/core';
import { SidebarService } from '@core/services/sidebar.service';
import { NavbarBreadcrumbService } from '@core/services/navbar-breadcrumb.service';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  notifications: any[] = [];

  constructor(
    public sidebarService: SidebarService,
    public navbarService: NavbarBreadcrumbService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void { }

  changeColor(color: string): void {
    this.themeService.setPrimaryColor(color);
  }

}
