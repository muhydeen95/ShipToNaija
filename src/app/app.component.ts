import { Component, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { Notification } from './@core/interfaces/index';
import {
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { NotificationService } from './@core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loadedTheme: string | null = null;
  newLoadedTheme: string | null = null;
  loadingRouteConfig: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    // private seoService: SEOService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.manageRouterEvents();

    this.listenToOfflineOnlineState();

    this.listenToLazyLoadedModules();
  }

  manageRouterEvents() {
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          // this.seoService.manageAllPageTitlesAndDescription();
          // this.seoService.setCanonicalLinkURL();
        })
    );
  }


  listenToOfflineOnlineState() {
    window.addEventListener('online', () => {
      const notification: Notification = {
        state: 'success',
        title: 'System Notification',
        message: "You're back online",
      };

      this.notificationService.openNotification(
        notification,
        'saw-notification-success'
      );
    });

    window.addEventListener('offline', () => {
      const notification: Notification = {
        state: 'warning',
        title: 'System Notification',
        message: "You're offline",
      };

      this.notificationService.openNotification(
        notification,
        'saw-notification-warning'
      );
    });
  }

  listenToLazyLoadedModules() {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof RouteConfigLoadStart) {
          this.loadingRouteConfig = true;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loadingRouteConfig = false;
        }
      })
    );
  }
}
