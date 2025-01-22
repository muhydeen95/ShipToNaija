import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Notification } from '../interfaces/notification.interface';
import { NotificationComponent } from '../shared/notification/notification.component';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  // private toastRef: any = null;
  // private currentTemplate: TemplateRef<any> | null = null;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private subscription = new Subscription();

  constructor(private toast: HotToastService) {
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
      duration: doNotDismiss === false ? 10000 : undefined,
      position: 'top-right',
      className: notificationClass,
    });
  }

  openNotificationWithTemplate(
    template: TemplateRef<any>,
    notificationClass?: string,
    doNotDismiss: boolean = false
  ) {
    // if (this.toastRef && this.currentTemplate === template) {
    //   return;
    // }

    // if (this.toastRef) {
    //   this.close();
    // }

    // this.currentTemplate = template;

    // this.toastRef =
    this.toast.show(template, {
      duration: doNotDismiss === false ? 10000 : undefined,
      dismissible: false,
      position: 'bottom-right',
      className: notificationClass,
      id: 'upload-progress',
      autoClose: false,
    });
  }

  closeAllNotifications() {
    this.toast.close();
  }

  // minimize() {
  //   if (this.toastRef) {
  //     this.close();
  //   }
  // }

  // close() {
  //   if (this.toastRef) {
  //     this.toast.close(this.toastRef.id);
  //     this.toastRef = null;
  //     this.currentTemplate = null;
  //   }
  // }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
