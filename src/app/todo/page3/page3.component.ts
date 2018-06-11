import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { OnsNavigator, Params } from 'ngx-onsenui';
import * as ons from 'onsenui';
import { Observable, merge } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { ShowSpinner, HideSpinner } from '../../core/actions';
import {
  TodoActionTypes,
  LoadTodos,
  CreateTodo,
  UpdateTodo,
  DeleteTodo
} from '../actions';
import * as fromTodo from '../reducers';
import { Todo } from '../../models';

@Component({
  selector: 'ons-page[page3]',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit, OnDestroy {
  private readonly onDestroy$ = new EventEmitter();

  todo: Todo;
  loading$: Observable<boolean>;

  /**
   * Constructor
   * @param spinner
   * @param store
   * @param actions$
   * @param navi
   * @param params
   */
  constructor(
    private store: Store<fromTodo.State>,
    private actions$: Actions,
    private navi: OnsNavigator,
    private params: Params,
  ) {}

  /**
   * Create
   * @param todo
   */
  create(todo: Todo) {
    this.store.dispatch(new ShowSpinner());
    this.store.dispatch(new CreateTodo({ todo }));
  }

  /**
   * Update
   * @param todo
   */
  update(todo: Todo) {
    this.store.dispatch(new ShowSpinner());
    this.store.dispatch(new UpdateTodo({
      todo: {
        id: todo.id,
        changes: { ...todo }
      }
    }));
  }

  /**
   * Initialize
   */
  ngOnInit() {
    this.loading$ = this.store.select(fromTodo.getLoading);
    this.todo = Object.assign({}, this.params.data.todo);

    // Save success
    const saveSuccess = this.actions$
      .ofType(TodoActionTypes.CreateTodoSuccess, TodoActionTypes.UpdateTodoSuccess)
      .pipe(
        tap(() => {
          this.navi.nativeElement.popPage();
        })
      );

    // Save failure
    const saveFailure = this.actions$
      .ofType(TodoActionTypes.CreateTodoFail, TodoActionTypes.UpdateTodoFail)
      .pipe(
        tap(() => {
          ons.notification.toast({
            message: 'Failed to save',
            timeout: 2000
          });
        })
      );

    // Hide spinner when save finished
    merge(saveSuccess, saveFailure)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.store.dispatch(new HideSpinner());
      });
  }

  /**
   * Finalize
   */
  ngOnDestroy() {
    this.onDestroy$.emit();
  }

  /**
   * Save
   * @param todo
   */
  save(todo: Todo) {
    if (todo.id) {
      this.update(todo);
    } else {
      this.create(todo);
    }
  }

  /**
   * Cancel
   */
  cancel() {
    this.navi.nativeElement.popPage();
  }

}
