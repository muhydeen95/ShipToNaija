import { createSelector } from '@ngrx/store';
import * as fromApp from '../app/app.reducer';
import * as fromCountry from './country.reducers';

const getCountryState = (state: fromApp.AppState) => state.country;

export const getIsLoading = createSelector(
  getCountryState,
  (state: fromCountry.State) => state.isLoading
);

export const getIsFetching = createSelector(
  getCountryState,
  (state: fromCountry.State) => state.isFetching
);

export const GetAllCountries = createSelector(
  getCountryState,
  (state: fromCountry.State) => state.countries
);

export const GetCitiesByState = createSelector(
  getCountryState,
  (state: fromCountry.State) => state.cities
);
