import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as AppActions from './app.actions';

import * as fromCountry from '../country/country.reducers';

/**
 * INSTRUCTIONS: Arrange each store in alphabetical order
 */
export interface AppState {
  country: fromCountry.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  country: fromCountry.countryReducer,
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
