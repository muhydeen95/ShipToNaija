import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  constructor(private router: Router) {}

  canDeactivate(component: CanComponentDeactivate) {
    if (this.router.getCurrentNavigation()?.extras?.state?.bypassGuard) {
      return true;
    } else {
      return component.canDeactivate ? component.canDeactivate() : true;
    }
  }
}
