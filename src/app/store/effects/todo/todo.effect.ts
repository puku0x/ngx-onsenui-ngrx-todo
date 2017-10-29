import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap} from 'rxjs/operators';

import * as TodoAction from '../../actions/todo/todo.action';
import { TodoService } from '../../../core/services';
import { Page, Todo } from '../../../models';

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
    .pipe(
      map(toPayload),
      switchMap((payload: any) => {
        const { offset, limit } = payload;
        return this.todoService
          .findAll(offset, limit)
          .pipe(
            map((data: Page<Todo>) => new TodoAction.FindAllSuccess(data.content)),
            catchError(error => of(new TodoAction.FindAllFailure(error)))
          );
      })
    );

  /**
   * Find
   */
  @Effect() find$: Observable<Action> = this.actions$
    .ofType(TodoAction.FIND)
    .pipe(
      map(toPayload),
      switchMap((payload: number) => {
        return this.todoService
          .find(payload)
          .pipe(
            map((data: Todo) => new TodoAction.FindSuccess(data)),
            catchError(error => of(new TodoAction.FindFailure(error)))
          );
      })
    );

  /**
   * Create
   */
  @Effect() create$: Observable<Action> = this.actions$
    .ofType(TodoAction.CREATE)
    .pipe(
      map(toPayload),
      switchMap((payload: Todo) => {
        return this.todoService
          .create(payload)
          .pipe(
            map((data: Todo) => new TodoAction.CreateSuccess(data)),
            catchError(error => of(new TodoAction.CreateFailure(error)))
          );
      })
    );

  /**
   * Update
   */
  @Effect() update$: Observable<Action> = this.actions$
    .ofType(TodoAction.UPDATE)
    .pipe(
      map(toPayload),
      switchMap((payload: Todo) => {
        return this.todoService
          .update(payload)
          .pipe(
            map((data: Todo) => new TodoAction.UpdateSuccess(data)),
            catchError(error => of(new TodoAction.UpdateFailure(error)))
          );
      })
    );

  /**
   * Delete
   */
  @Effect() delete$: Observable<Action> = this.actions$
    .ofType(TodoAction.DELETE)
    .pipe(
      map(toPayload),
      switchMap((payload: number) => {
        return this.todoService
          .delete(payload)
          .pipe(
            map((data: Todo) => new TodoAction.DeleteSuccess(data.id)),
            catchError(error => of(new TodoAction.DeleteFailure(error)))
          );
      })
    );
}
