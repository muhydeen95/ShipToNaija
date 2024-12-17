import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '@store/app/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  private subscription = new Subscription();

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   let isAuthenticated!: boolean;
  //   this.authenticatedUserSub = this.store.select('auth').subscribe((res) => {
  //     isAuthenticated = res.user !== null;
  //   });
  //   return this.handleAuthorization(isAuthenticated, state);
  // }

  // private handleAuthorization(
  //   isAuthenticated: boolean,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   if (!isAuthenticated) {
  //     this.router.navigate(['/login'], {
  //       queryParams: {
  //         returnUrl: state.url,
  //       },
  //     });
  //     return isAuthenticated;
  //   } else {
  //     return isAuthenticated;
  //   }
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(
    route: ActivatedRouteSnapshot,
    url: string
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        const isAuth = authState.user !== null;
        if (isAuth === true) {
          return true;
        } else {
          return this.router.createUrlTree(['/login'], {
            queryParams: { returnUrl: url },
          });
        }
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
