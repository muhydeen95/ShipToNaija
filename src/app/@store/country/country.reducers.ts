import { createReducer, on, Action } from '@ngrx/store';
import * as CountryActions from './country.actions';

export interface State {
  isLoading: boolean;
  isFetching: boolean;
  countries: any[] | null;
  cities: any;
}

const initialState: State = {
  isLoading: false,
  isFetching: false,
  countries: null,
  cities: null,
};

const countryReducerInternal = createReducer(
  initialState,
  on(CountryActions.ResetStore, (state) => ({
    ...initialState,
  })),

  on(CountryActions.IsLoading, (state, { payload }) => ({
    ...state,
    isLoading: payload,
  })),

  on(CountryActions.IsFetching, (state, { payload }) => ({
    ...state,
    isFetching: payload,
  })),

  on(CountryActions.SaveAllCountriesAndState, (state, { payload }) => ({
    ...state,
    countries: payload,
  })),

  on(CountryActions.SaveCitiesByState, (state, { payload }) => ({
    ...state,
    cities: payload,
  }))
);

export function countryReducer(state: State | undefined, action: Action) {
  return countryReducerInternal(state, action);
}
