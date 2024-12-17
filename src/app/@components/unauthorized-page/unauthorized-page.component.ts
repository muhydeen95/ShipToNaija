import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.scss'],
})
export class UnauthorizedPageComponent {
  constructor(private themeService: ThemeService) {
    this.themeService.removeWebappThemes();
  }
}
