import {
  Component,
  Inject,
  // ElementRef,
  Optional,
} from '@angular/core';
// import {
//   MatSnackBar,
// , MAT_SNACK_BAR_DATA
// } from '@angular/material/snack-bar';
import { Notification } from '../../interfaces/notification.interface';
import { HotToastRef } from '@ngneat/hot-toast';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  constructor(
    // @Inject(MAT_SNACK_BAR_DATA) public data: Notification,
    @Optional() @Inject(HotToastRef) public toastRef: HotToastRef<Notification> // private snackBar: MatSnackBar, // private elementRef: ElementRef
  ) {}

  closeNotification() {
    this.toastRef.close();

    // this.elementRef.nativeElement.addEventListener('click', () => {
    //   this.snackBar.dismiss();
    // });
  }
}
