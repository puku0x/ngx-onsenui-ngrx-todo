import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, toPayload } from '@ngrx/effects';
import { OnsNavigator, Params } from 'ngx-onsenui';
import * as ons from 'onsenui';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map, takeUntil, tap } from 'rxjs/operators';

import * as SpinnerAction from '../../store/actions/spinner/spinner.action';
import * as TodoAction from '../../store/actions/todo/todo.action';
import * as fromTodo from '../../store/reducers/todo/todo.reducer';
import { Todo } from '../../models';

@Component({
  selector: 'ons-page[page3]',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit, OnDestroy {
  todo: Todo;
  loading$: Observable<boolean>;
  onDestroy = new Subject();

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
    this.store.dispatch(new SpinnerAction.Show());
    this.store.dispatch(new TodoAction.Create(todo));
  }

  /**
   * Update
   * @param todo
   */
  update(todo: Todo) {
    this.store.dispatch(new SpinnerAction.Show());
    this.store.dispatch(new TodoAction.Update(todo));
  }

  /**
   * Initialize
   */
  ngOnInit() {
    this.loading$ = this.store.select(fromTodo.getLoading);
    this.todo = Object.assign({}, this.params.data.todo);

    // Save success
    const saveSuccess = this.actions$
      .ofType(TodoAction.CREATE_SUCCESS, TodoAction.UPDATE_SUCCESS)
      .pipe(
        tap(() => {
          this.navi.nativeElement.popPage();
        })
      );

    // Save failure
    const saveFailure = this.actions$
      .ofType(TodoAction.CREATE_FAILURE, TodoAction.UPDATE_FAILURE)
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
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.store.dispatch(new SpinnerAction.Hide());
      });
  }

  /**
   * Finalize
   */
  ngOnDestroy() {
    this.onDestroy.next();
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
