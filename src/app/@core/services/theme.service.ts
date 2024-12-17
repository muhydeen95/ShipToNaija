import {
  Injectable,
  Renderer2,
  RendererFactory2,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  currentTheme = new BehaviorSubject(this.currentActive());
  userBranding: any;

  private renderer: Renderer2;
  private colorScheme: string | null = '';
  // Define prefix for clearer and more readable class names in scss files
  private themeSuffix = '-mode';
  private subscription = new Subscription();

  constructor(
    rendererFactory: RendererFactory2,
  ) {
    // Create new renderer from renderFactory, to make it possible to use renderer2 in a service
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  _detectPrefersColorScheme() {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise set to light.
      this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
    } else {
      // If the browser doesn't support prefers-color-scheme, set it as default to light
      this.colorScheme = 'light';
    }
  }

  _setColorScheme(scheme: any) {
    this.colorScheme = scheme;
    // Save prefers-color-scheme to localStorage
    localStorage.setItem('prefers-color', scheme);
  }

  _getColorScheme() {
    // Check if any prefers-color-scheme is stored in localStorage
    if (localStorage.getItem('prefers-color')) {
      // Save prefers-color-scheme from localStorage
      this.colorScheme = localStorage.getItem('prefers-color');
    } else {
      // If no prefers-color-scheme is stored in localStorage, try to detect OS default prefers-color-scheme
      this._detectPrefersColorScheme();
    }
  }

  load() {
    this._getColorScheme();
    this.renderer.addClass(document.body, this.colorScheme + this.themeSuffix);
  }

  update(scheme: any) {
    this._setColorScheme(scheme);
    // Remove the old color-scheme class
    this.renderer.removeClass(
      document.body,
      (this.colorScheme === 'dark' ? 'light' : 'dark') + this.themeSuffix
    );
    // Add the new / current color-scheme class
    this.renderer.addClass(document.body, scheme + this.themeSuffix);

    // Add transition
    this.renderer.addClass(document.body, 'animate-colors-transition');
  }

  currentActive() {
    this._getColorScheme();
    return this.colorScheme;
  }

  removeWebappThemes() {
    document.body.classList.forEach((el) => {
      if (el && el?.includes('theme') && el !== 'saw-default-theme') {
        document.body.classList.remove(el);
      }
    });

    if (!document.body.classList.contains('saw-default-theme')) {
      document.body.classList.add('saw-default-theme');
    }
  }

  removeSAWDefaultTheme() {
    document?.body?.classList?.forEach((el) => {
      if (el?.includes('saw-default-theme')) {
        document?.body?.classList?.remove(el);
      }
    });

    
  }

  setPrimaryColor(color: string): void {
    this.renderer.setStyle(document.documentElement, '--primary-color', color);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
