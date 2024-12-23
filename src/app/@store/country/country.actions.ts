// Country

import { createAction, props } from '@ngrx/store';
export const ResetStore = createAction('[Country] Reset Store');

export const IsLoading = createAction(
  '[Country] Is Loading',
  props<{
    payload: boolean;
  }>()
);
export const IsFetching = createAction(
  '[Country] Is Fetching',
  props<{
    payload: boolean;
  }>()
);

export const GetAllCountriesAndStates = createAction(
  '[Country] Get All Countries and states'
);

export const SaveAllCountriesAndState = createAction(
  '[Country] Save All Countries And States',
  props<{
    payload: any;
  }>()
);

export const GetCitiesByState = createAction(
  '[Country] Get Cities By State',
  props<{
    payload: {
      country: string;
      state: string
    };
  }>()
);

export const SaveCitiesByState = createAction(
  '[Country] Save Cities By State',
  props<{
    payload: any;
  }>()
);