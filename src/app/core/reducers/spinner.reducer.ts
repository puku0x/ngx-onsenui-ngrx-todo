import { Action, createSelector, createFeatureSelector } from '@ngrx/store';

import { SpinnerActions, SpinnerActionTypes } from '../actions';

/**
 * State
 */
export interface State {
  readonly showing: boolean;
}

/**
 * Initial state
 */
export const initialState = {
  showing: false
};

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(
  state = initialState,
  action: SpinnerActions
): State {
  switch (action.type) {
    case SpinnerActionTypes.ShowSpinner: {
      return { ...state, showing: true };
    }
    case SpinnerActionTypes.HideSpinner: {
      return { ...state, showing: false };
    }
    default: {
      return state;
    }
  }
}
