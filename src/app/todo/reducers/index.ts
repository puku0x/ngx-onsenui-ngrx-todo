import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromTodo from './todo.reducer';

/**
 * Feature state
 */
export interface State {
  todos: fromTodo.State;
}

export const reducers: ActionReducerMap<State> = {
  todos: fromTodo.reducer,
};

export const getTodoState = createFeatureSelector<State>('todo');
export const getTodoEntityState = createSelector(getTodoState, state => state.todos);
export const getTodos = createSelector(getTodoEntityState, fromTodo.selectAll);
export const getTodo = createSelector(getTodoEntityState, state => state.todo);
export const getLoading = createSelector(getTodoEntityState, state => state.loading);
