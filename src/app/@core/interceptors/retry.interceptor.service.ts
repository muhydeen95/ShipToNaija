import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, timer, throwError, of } from 'rxjs';
import { retryWhen, mergeMap } from 'rxjs/operators';
// import { Notification } from '@core/interfaces';
// import { NotificationService } from '@core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class RetryInterceptorService implements HttpInterceptor {
  retryDelay = 2000;
  retryMaxAttempts = 0;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(this.retryAfterDelay());
  }

  constructor() {} // private notificationService: NotificationService

  retryAfterDelay(): any {
    return retryWhen((errors) => {
      return errors.pipe(
        mergeMap((err, count) => {
          if (count === this.retryMaxAttempts) {
            // const notification: Notification = {
            //   state: 'error',
            //   title: 'System Notification',
            //   message: `Network request failed`,
            // };

            // this.notificationService.openNotification(
            //   notification,
            //   'saw-notification-error'
            // );

            return throwError(err);
          }
          return of(err).pipe(
            // tap((error) =>
            //   console.log(`Retrying ${error.url}. Retry count ${count + 1}`)
            // ),
            mergeMap(() => timer(this.retryDelay))
          );
        })
      );
    });
  }
}
