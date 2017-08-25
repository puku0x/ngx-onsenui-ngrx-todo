import { ActionReducerMap } from '@ngrx/store';
import * as fromTodo from './todo.reducer';

/**
 * アプリケーション全体の状態
 */
export interface State {
  todo: fromTodo.State;
}

/**
 * アプリケーション全体の状態
 */
export const reducers: ActionReducerMap<State> = {
  todo: fromTodo.reducer,
};
