import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import * as TodoAction from '../../actions/todo/todo.action';
import { TodoService } from '../../../core/services';

/**
 * Effect
 */
@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) { }

  /**
   * Find all
   */
  @Effect() findAll$: Observable<Action> = this.actions$
    .ofType(TodoAction.FIND_ALL)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .findAll(payload.offset, payload.limit)
        .map(data => new TodoAction.FindAllSuccess(data.content))
        .catch(error => Observable.of(new TodoAction.FindAllFailure(error)))
    );

  /**
   * Find
   */
  @Effect() find$: Observable<Action> = this.actions$
    .ofType(TodoAction.FIND)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .find(payload)
        .map(data => new TodoAction.FindSuccess(data))
        .catch(error => Observable.of(new TodoAction.FindFailure(error)))
    );

  /**
   * Create
   */
  @Effect() create$: Observable<Action> = this.actions$
    .ofType(TodoAction.CREATE)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .create(payload)
        .map(data => new TodoAction.CreateSuccess(data))
        .catch(error => Observable.of(new TodoAction.CreateFailure(error)))
    );

  /**
   * Update
   */
  @Effect() update$: Observable<Action> = this.actions$
    .ofType(TodoAction.UPDATE)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .update(payload)
        .map(data => new TodoAction.UpdateSuccess(data))
        .catch(error => Observable.of(new TodoAction.UpdateFailure(error)))
    );

  /**
   * Delete
   */
  @Effect() delete$: Observable<Action> = this.actions$
    .ofType(TodoAction.DELETE)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .delete(payload)
        .map(data => new TodoAction.DeleteSuccess(data.id))
        .catch(error => Observable.of(new TodoAction.DeleteFailure(error)))
    );
}
