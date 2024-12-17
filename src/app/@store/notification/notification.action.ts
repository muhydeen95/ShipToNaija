// Sections

import { createAction, props } from '@ngrx/store';
export const ResetStore = createAction('[Notification] Reset Store');

export const IsLoading = createAction(
  '[Notification] Is Loading',
  props<{
    payload: boolean;
  }>()
);
export const IsFetching = createAction(
  '[Notification] Is Fetching',
  props<{
    payload: boolean;
  }>()
);

export const GetNotificationsByUserId = createAction(
  '[Notification] Get Notifications By User Id'
);

export const SaveNotificationsByUserId = createAction(
  '[Notification] Save Notifications By User Id',
  props<{
    payload: any;
  }>()
);

export const GetNotificationById = createAction(
  '[Notification] Get Notification By Id',
  props<{
    payload: {
      id: string;
    };
  }>()
);

export const SaveNotificationById = createAction(
  '[Notification] Save Notification By Id',
  props<{
    payload: any;
  }>()
);

export const DeleteNotification = createAction(
  '[Notification] Delete Notification',
  props<{
    payload: {
      _id: string;
    };
  }>()
);

export const ReadNotification = createAction(
  '[Notification] Read Notification',
  props<{
    payload: {
      _id: string;
      isRead: boolean;
    };
  }>()
);
