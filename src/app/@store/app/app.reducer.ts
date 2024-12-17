import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as AppActions from './app.actions';

import * as fromNotification from '../notification/notification.reducer';

/**
 * INSTRUCTIONS: Arrange each store in alphabetical order
 */
export interface AppState {
  notification: fromNotification.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  notification: fromNotification.notificationReducer,
};

export function resetStoreMetaReducer<State extends {}>(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return (state, action) => {
    if (action !== null && action.type === AppActions.ResetAllStores.type) {
      state = {} as State; // ==> Emptying state here
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [resetStoreMetaReducer];
