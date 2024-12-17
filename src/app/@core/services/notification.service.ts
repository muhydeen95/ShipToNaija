import { Injectable, OnDestroy } from '@angular/core';
import {
  // MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Notification } from '../interfaces/notification.interface';
import { NotificationComponent } from '../shared/notification/notification.component';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private subscription = new Subscription();

  constructor(
    // private snackBar: MatSnackBar,
    private toast: HotToastService
  ) {
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true,
    };
  }

  openNotification(
    message: Notification,
    notificationClass: string,
    doNotDismiss: boolean = false
  ) {
    this.toast.show<Notification>(NotificationComponent, {
      data: message,
      duration: doNotDismiss === false ? 3000 : undefined,
      // duration: doNotDismiss === false ? 15000 : undefined,
      position: 'top-right',
      className: notificationClass,
      dismissible: true,
    });

    // this.subscription.add(
    //   toastRef.afterClosed.subscribe((e) => {
    //     // Do something
    //   })
    // );

    // const snackBarRef = this.snackBar.openFromComponent(NotificationComponent, {
    //   data: message,
    //   duration: doNotDismiss === false ? 15000 : undefined,
    //   panelClass: [notificationClass],
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });

    // this.snackBarRefSub = snackBarRef.afterDismissed().subscribe(() => {
    //   // this.store.dispatch(GeneralActions.ClearNotification());
    // });
  }

  closeAllNotifications() {
    this.toast.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
