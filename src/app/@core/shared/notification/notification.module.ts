import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, MatRippleModule, MatSnackBarModule],
  exports: [NotificationComponent],
})
export class NotificationModule {}
