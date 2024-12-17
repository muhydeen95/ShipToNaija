import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromApp from '../app/app.reducer';
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  share,
} from 'rxjs/operators';
import * as NotificationActions from './notification.action';
import { environment } from '@env/environment';
import { NotificationService } from '../../@core/services/notification.service';
import { HelperService } from '../../@core/services/helper.service';
import { ApiResponse, Notification, Section } from '@core/interfaces';
@Injectable()
export class NotificationEffects {
  defaultUserPaginationPayload = {
    payload: {
      skip: 0,
      take: 10,
    },
  };

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private notificationService: NotificationService,
    private helperService: HelperService
  ) {}

  private handleCatchError = (errorRes: HttpErrorResponse, type: string) => {
    this.store.dispatch(NotificationActions.IsLoading({ payload: false }));

    return this.helperService.handleErrorMessages(errorRes, type);
  };

  getNotificationsByUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotificationActions.GetNotificationsByUserId),
      withLatestFrom(this.store.select('auth')),
      switchMap(([notificationData, authState]) => {
        return this.http
          .get<ApiResponse<Section[]>>(
            `${environment.api_url}/notification/user/${authState.user._id}`
          )
          .pipe(
            map((res) => {
              this.store.dispatch(
                NotificationActions.IsLoading({ payload: false })
              );
              if (!res.error) {
                return NotificationActions.SaveNotificationsByUserId({
                  payload: res.data,
                });
              } else {
                const notification: Notification = {
                  state: 'success',
                  message: res.message,
                };

                this.notificationService.openNotification(
                  notification,
                  'saw-notification-success'
                );

                this.store.dispatch(
                  NotificationActions.SaveNotificationsByUserId({
                    payload: [],
                  })
                );

                return {
                  type: '[Notification] Failed To Get All Notifications',
                };
              }
            }),
            catchError((errorRes: any) => {
              return this.handleCatchError(
                errorRes,
                `[Notification][CatchError]  Failed To Get All Notifications ${errorRes.message}`
              );
            })
          );
      })
    );
  });

  getNotificationById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotificationActions.GetNotificationById),
        withLatestFrom(this.store.select('auth')),
        switchMap(([notificationData, authState]) => {
          return this.http
            .get<ApiResponse<Section>>(
              `${environment.api_url}/notification/find/${notificationData.payload.id}`
            )
            .pipe(
              map((resData: ApiResponse<Section>) => {
                this.store.dispatch(
                  NotificationActions.IsFetching({ payload: false })
                );

                if (!resData.error) {
                  this.store.dispatch({
                    type: '[Notification] Get Notification By Id Was Successful',
                  });

                  return resData['data'];
                } else {
                  this.store.dispatch({
                    type: '[Notification] Failed To Get Notification By Id',
                  });

                  const notification: Notification = {
                    state: 'error',
                    message: resData.message,
                  };

                  this.notificationService.openNotification(
                    notification,
                    'saw-notification-error'
                  );

                  return resData['data'];
                }
              }),
              catchError((errorRes: any) => {
                return this.handleCatchError(
                  errorRes,
                  `[Notification][CatchError] Failed To Get Notification By Id ${errorRes.message}`
                );
              })
            );
        }),
        share()
      ),

    { dispatch: false }
  );

  deleteNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.DeleteNotification),
      withLatestFrom(this.store.select('auth')),
      switchMap(([notificationData, authState]) => {
        return this.http
          .delete<ApiResponse<any>>(
            `${environment.api_url}/notification/find/${notificationData.payload._id}`
          )
          .pipe(
            map((resData: any) => {
              this.store.dispatch(
                NotificationActions.IsLoading({ payload: false })
              );

              if (!resData.error) {
                this.store.dispatch(
                  NotificationActions.GetNotificationsByUserId()
                );

                return {
                  type: '[Notification] Delete Notification Was Successful',
                };
              } else {
                const notification: Notification = {
                  state: 'error',
                  message: resData.message,
                };

                this.notificationService.openNotification(
                  notification,
                  'saw-notification-error'
                );

                return {
                  type: '[Notification] Failed To Delete Notification',
                };
              }
            }),
            catchError((errorRes: any) => {
              return this.handleCatchError(
                errorRes,
                `[Notification][CatchError] Failed To Delete Notification ${errorRes.message}`
              );
            })
          );
      })
    )
  );

  readNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.ReadNotification),
      withLatestFrom(this.store.select('auth')),
      switchMap(([notificationData, authState]) => {
        return this.http
          .put<ApiResponse<any>>(
            `${environment.api_url}/notification/find/${notificationData.payload._id}`,
            notificationData
          )
          .pipe(
            map((resData: any) => {
              this.store.dispatch(
                NotificationActions.IsLoading({ payload: false })
              );

              if (!resData.error) {
                this.store.dispatch(
                  NotificationActions.GetNotificationsByUserId()
                );

                return {
                  type: '[Notification] Read Notification Was Successful',
                };
              } else {
                const notification: Notification = {
                  state: 'error',
                  message: resData.message,
                };

                this.notificationService.openNotification(
                  notification,
                  'saw-notification-error'
                );

                return {
                  type: '[Notification] Failed To Read Notification',
                };
              }
            }),
            catchError((errorRes: any) => {
              return this.handleCatchError(
                errorRes,
                `[Notification][CatchError] Failed To Read Notification ${errorRes.message}`
              );
            })
          );
      })
    )
  );
}
