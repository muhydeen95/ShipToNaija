import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../../@store/app/app.reducer';
import * as authSelectors from '../../@store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppGuard
  implements CanActivate, CanActivateChild, CanLoad, OnDestroy
{
  userPermissions: string[];

  private subscription: Subscription = new Subscription();

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
    const userPermissions = this.store.pipe(
      select(authSelectors.getUserPermissions)
    );

    this.subscription.add(
      userPermissions.subscribe((permissions) => {
        if (permissions) {
          this.userPermissions = [...permissions];
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.checkChildRoutes(childRoute, state)) {
      return true;
    } else {
      this.router.navigate(['/unauthorized-page']);
      return false;
    }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  checkChildRoutes(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    /************************** Dashboard ***************************/
    if (state.url === '/app/dashboard') {
      // Not authorized
      return true;
    }
    //  else if (
    //   /************************** Other ***************************/

    //   state.url.includes('/app/document/e/editor') &&
    //   this.checkForPermissions(route.data.permissions)
    // ) {
    //   // Not authorized
    //   return false;
    // }
    else {
      return true;
    }
  }

  checkForPermissions(permissions: string[]) {
    return false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
