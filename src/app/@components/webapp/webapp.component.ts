import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { webappRouteAnimations } from '@core/animations/route.animations';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.scss'],
  animations: [webappRouteAnimations],
})
export class WebappComponent implements OnInit, AfterViewInit, OnDestroy {
  swUpdateSub: Subscription;
  unusedTest: any;
  loadingRouteConfig: boolean = false;
  subscriptionInfo: any;
  expirationMessage: string;
  subscriptionDetails: any;
  userDetails: any;
  showExpirationBanner: Observable<boolean>;
  manageClosedSidebarModeHoverBound: any;
  sidebarMode!: any;

  isSidebarOpen = false;
  isMobile = false;

  private subscription: Subscription = new Subscription();

  @ViewChild('webapp', { static: false }) webapp: ElementRef;
  @ViewChild('aside', { static: false }) aside: ElementRef;
  @ViewChild('main', { static: false }) main: ElementRef;
  @ViewChild('mainContent', { static: false }) mainContent!: ElementRef;

  constructor(
    private renderer: Renderer2,
    public dialog: MatDialog,
    private router: Router,
    public sidebarService: SidebarService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.listenToLazyLoadedModules();

    this.configureSidebarModeOnInit();

    this.checkIfMobile();

    this.sidebarService.checkWindowDimension();
  }

  ngAfterViewInit(): void {
    this.listenToCurrentSidebarModeSub();
  }

  configureSidebarModeOnInit() {
    if (window.matchMedia('(min-width: 990.125px)').matches) {
      this.sidebarService.setSavedSidebarMode();
    } else {
      this.sidebarService.setSidebarMode('mini');
    }
  }

  listenToCurrentSidebarModeSub() {
    this.subscription.add(
      this.sidebarService.currentSidebarMode.subscribe((resData) => {
        if (resData) {
          this.sidebarMode = resData;

          this.changeDetectorRef.detectChanges();

          this.manageClosedSidebarModeHoverBound =
            this.manageClosedSidebarModeHover.bind(this);

          const linkContainers = document.querySelectorAll(
            '#sidebar .sidebar-content .all-links .link-container'
          );

          const hideClosedSidebarBound = this.hideClosedSidebar.bind(this);

          if (resData === 'closed') {
            (this.webapp.nativeElement as HTMLElement).addEventListener(
              'mousemove',
              this.manageClosedSidebarModeHoverBound,
              false
            );

            if (linkContainers) {
              Array.from(linkContainers).forEach((linkContainer) => {
                linkContainer.addEventListener(
                  'click',
                  hideClosedSidebarBound,
                  false
                );
              });
            }
          } else {
            (this.webapp.nativeElement as HTMLElement).removeEventListener(
              'mousemove',
              this.manageClosedSidebarModeHoverBound,
              false
            );

            if (linkContainers) {
              Array.from(linkContainers).forEach((linkContainer) => {
                linkContainer.removeEventListener(
                  'click',
                  hideClosedSidebarBound,
                  false
                );
              });
            }
          }
        }
      })
    );
  }

  manageClosedSidebarModeHover(event: MouseEvent) {
    if (event) {
      if (
        event.x <= 20 ||
        event.composedPath().includes(this.aside.nativeElement)
      ) {
        this.showClosedSidebar();
      } else {
        this.hideClosedSidebar();
      }
    }
  }

  showClosedSidebar() {
    if (!this.webapp?.nativeElement.classList.contains('show-closed-sidebar')) {
      this.renderer.addClass(this.webapp?.nativeElement, 'show-closed-sidebar');
    }
  }

  hideClosedSidebar() {
    if (this.webapp?.nativeElement.classList.contains('show-closed-sidebar')) {
      this.renderer.removeClass(
        this.webapp?.nativeElement,
        'show-closed-sidebar'
      );
    }
  }

  onWindowResize() {
    this.sidebarService.checkWindowDimension();
  }


  checkIfMobile() {
    this.isMobile = window.innerWidth <= 575.98;
    
    if (this.isMobile) {
      this.sidebarMode = 'closed';
      this.sidebarService.setSidebarMode('closed');
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;

    this.sidebarService.setSidebarMode('closed');
  }

  listenToLazyLoadedModules() {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });

        if (event instanceof RouteConfigLoadStart) {
          this.loadingRouteConfig = true;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loadingRouteConfig = false;
        }
      })
    );
  }

  onRouteActivate(event: any) {
    (this.mainContent?.nativeElement as HTMLElement)?.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
