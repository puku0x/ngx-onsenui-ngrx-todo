import { ActionReducerMap } from '@ngrx/store';
import * as fromSpinner from './spinner.reducer';
import * as fromTodo from './todo.reducer';

/**
 * App state
 */
export interface State {
  spinner: fromSpinner.State;
  todo: fromTodo.State;
}

/**
 * Reducers
 */
export const reducers: ActionReducerMap<State> = {
  spinner: fromSpinner.reducer,
  todo: fromTodo.reducer,
};
