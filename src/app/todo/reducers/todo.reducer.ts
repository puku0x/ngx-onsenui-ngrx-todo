import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Todo } from '../../models';
import { TodoActions, TodoActionTypes } from '../actions';

/**
 * State
 */
export interface State extends EntityState<Todo> {
  // additional entities state properties
  loading: boolean;
  todo: Todo;
}

/**
 * Adapter
 */
export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  todo: null
});

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(
  state = initialState,
  action: TodoActions
): State {
  switch (action.type) {
    case TodoActionTypes.LoadTodos: {
      return { ...state, loading: true };
    }
    case TodoActionTypes.LoadTodosSuccess: {
      return adapter.addAll(action.payload.todos, { ...state, loading: false } );
    }
    case TodoActionTypes.LoadTodosFail: {
      return { ...state, loading: false };
    }
    case TodoActionTypes.LoadTodo: {
      return { ...state, loading: true, todo: state.entities[action.payload.id] };
    }
    case TodoActionTypes.LoadTodoSuccess: {
      return { ...state, loading: false, todo: action.payload.todo };
    }
    case TodoActionTypes.LoadTodoFail: {
      return { ...state, loading: false };
    }
    case TodoActionTypes.CreateTodo: {
      return { ...state, loading: true };
    }
    case TodoActionTypes.CreateTodoSuccess: {
      return adapter.addOne(action.payload.todo, { ...state, loading: false });
    }
    case TodoActionTypes.CreateTodoFail: {
      return { ...state, loading: false };
    }
    case TodoActionTypes.UpdateTodo: {
      return { ...state, loading: true };
    }
    case TodoActionTypes.UpdateTodoSuccess: {
      return adapter.updateOne(action.payload.todo, { ...state, loading: false, todo: action.payload.todo.changes });
    }
    case TodoActionTypes.UpdateTodoFail: {
      return { ...state, loading: false };
    }
    case TodoActionTypes.DeleteTodo: {
      return { ...state, loading: true };
    }
    case TodoActionTypes.DeleteTodoSuccess: {
      return adapter.removeOne(action.payload.id, { ...state, loading: false });
    }
    case TodoActionTypes.DeleteTodoFail: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
