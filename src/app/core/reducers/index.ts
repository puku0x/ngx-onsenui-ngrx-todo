import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';
import * as fromSpinner from './spinner.reducer';

/**
 * Root state
 */
export interface State {
  spinner: fromSpinner.State;
}

/**
 * Root reducers
 */
export const reducers: ActionReducerMap<State> = {
  spinner: fromSpinner.reducer
};

/**
 * Meta reducers
 */
export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];


/**
 * Selectors
 */
export const getSpinnerState = createFeatureSelector<fromSpinner.State>('spinner');
export const getSpinnerShowing = createSelector(getSpinnerState, state => state.showing);
