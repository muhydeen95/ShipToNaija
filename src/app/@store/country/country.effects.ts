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
import * as CountryActions from './country.actions';
import { environment } from '@env/environment';
import { NotificationService } from '../../@core/services/notification.service';
import { HelperService } from '../../@core/services/helper.service';
import { ApiResponse, Notification } from '@core/interfaces';

@Injectable()
export class CountryEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private notificationService: NotificationService,
    private helperService: HelperService
  ) {}

  private handleCatchError = (errorRes: HttpErrorResponse, type: string) => {
    this.store.dispatch(CountryActions.IsLoading({ payload: false }));

    return this.helperService.handleErrorMessages(errorRes, type);
  };

  getCountriesAndStates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryActions.GetAllCountriesAndStates),
      withLatestFrom(this.store.select('country')),
      switchMap(([countryDdata, authState]) => {
        return this.http
          .get<ApiResponse<any[]>>(
            `${environment.api_url}/countries/states`
          )
          .pipe(
            map((res) => {
              this.store.dispatch(
                CountryActions.IsFetching({ payload: false })
              );

              if (!res.error) {
                return CountryActions.SaveAllCountriesAndState({
                  payload: res.data,
                });

              } else {
                const notification: Notification = {
                  state: 'success',
                  message: res.message,
                };

                this.notificationService.openNotification(
                  notification,
                  'saw-notification-error'
                );

                this.store.dispatch(
                  CountryActions.SaveAllCountriesAndState({
                    payload: [],
                  })
                );

                return {
                  type: '[Country] Failed To Get All Countries',
                };
              }
            }),
            catchError((errorRes: any) => {
              return this.handleCatchError(
                errorRes,
                `[Country][CatchError]  Failed To Get All Countries ${errorRes.message}`
              );
            })
          );
      })
    );
  });

  getCitiesByState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountryActions.GetCitiesByState),
        withLatestFrom(this.store.select('country')),
        switchMap(([countryDdata, authState]) => {
          return this.http
            .post<ApiResponse<any[]>>(
              `${environment.api_url}/countries/state/cities`,
              countryDdata.payload
            )
            .pipe(
              map((res: ApiResponse<any[]>) => {
                this.store.dispatch(
                  CountryActions.IsFetching({ payload: false })
                );

                if (!res.error) {
                    return CountryActions.SaveCitiesByState({
                      payload: res.data,
                    });
    
                  } else {
                    const notification: Notification = {
                      state: 'success',
                      message: res.message,
                    };
    
                    this.notificationService.openNotification(
                      notification,
                      'saw-notification-error'
                    );
    
                    this.store.dispatch(
                      CountryActions.SaveCitiesByState({
                        payload: [],
                      })
                    );
    
                    return {
                      type: '[Country] Failed To Get Cities by State',
                    };
                  }
              }),
              catchError((errorRes: any) => {
                return this.handleCatchError(
                  errorRes,
                  `[Country][CatchError] Failed To Get Cities By State ${errorRes.message}`
                );
              })
            );
        }),
        share()
      ),

    { dispatch: false }
  );

}
