import { createSelector } from '@ngrx/store';
import * as fromApp from '../app/app.reducer';
import * as fromNotification from './notification.reducer';

const getNotificationState = (state: fromApp.AppState) => state.notification;

export const getNotificationIsLoading = createSelector(
  getNotificationState,
  (state: fromNotification.State) => state.isLoading
);

export const getNotificationIsFetching = createSelector(
  getNotificationState,
  (state: fromNotification.State) => state.isFetching
);

export const GetAllNotifications = createSelector(
  getNotificationState,
  (state: fromNotification.State) => state.notifications
);

export const GetNotificationById = createSelector(
  getNotificationState,
  (state: fromNotification.State) => state.notification
);
