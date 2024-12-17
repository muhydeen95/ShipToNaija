import { createReducer, on, Action } from '@ngrx/store';
import * as SectionActions from './notification.action';

export interface State {
  isLoading: boolean;
  isFetching: boolean;
  notifications: any[] | null;
  notification: any;
}

const initialState: State = {
  isLoading: false,
  isFetching: false,
  notifications: null,
  notification: null,
};

const notificationReducerInternal = createReducer(
  initialState,
  on(SectionActions.ResetStore, (state) => ({
    ...initialState,
  })),

  on(SectionActions.IsLoading, (state, { payload }) => ({
    ...state,
    isLoading: payload,
  })),

  on(SectionActions.IsFetching, (state, { payload }) => ({
    ...state,
    isFetching: payload,
  })),

  on(SectionActions.SaveNotificationsByUserId, (state, { payload }) => ({
    ...state,
    notifications: payload,
  })),

  on(SectionActions.SaveNotificationById, (state, { payload }) => ({
    ...state,
    notification: payload,
  }))
);

export function notificationReducer(state: State | undefined, action: Action) {
  return notificationReducerInternal(state, action);
}
