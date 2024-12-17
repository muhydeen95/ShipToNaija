import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  constructor(private themeService: ThemeService) {
    this.themeService.removeWebappThemes();
  }
}
