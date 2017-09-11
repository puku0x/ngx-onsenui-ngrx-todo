import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import * as SpinnerAction from '../actions/spinner.action';

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
export function reducer(state = initialState, action: SpinnerAction.Actions): State {
  switch (action.type) {
    case SpinnerAction.SHOW: {
      return Object.assign({}, state, { showing: true });
    }
    case SpinnerAction.HIDE: {
      return Object.assign({}, state, { showing: false });
    }
    default: {
      return state;
    }
  }
}

// Selector
export const getState = createFeatureSelector<State>('spinner');
export const getShowing = createSelector(getState, (state: State) => state.showing);
