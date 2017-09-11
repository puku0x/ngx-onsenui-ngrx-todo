import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { OnsNavigator, Params } from 'ngx-onsenui';
import * as ons from 'onsenui';

import * as SpinnerAction from '../core/actions/spinner.action';
import * as SpinnerReducer from '../core/reducers/spinner.reducer';
import * as TodoAction from '../core/actions/todo.action';
import * as TodoReducer from '../core/reducers/todo.reducer';
import { Todo } from '../interfaces';

@Component({
  selector: 'ons-page[page3]',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {
  todo: Todo;
  loading$: Observable<boolean>;

  /**
   * Constructor
   * @param store
   * @param navi
   * @param params
   */
  constructor(
    private spinner: Store<SpinnerReducer.State>,
    private store: Store<TodoReducer.State>,
    private actions$: Actions,
    private navi: OnsNavigator,
    private params: Params,
  ) {
    this.loading$ = store.select(TodoReducer.getLoading);
  }

  /**
   * Create
   * @param todo
   */
  create(todo: Todo) {
    this.spinner.dispatch(new SpinnerAction.Show());
    this.store.dispatch(new TodoAction.Create(todo));
    const success = this.actions$
      .ofType(TodoAction.CREATE_SUCCESS)
      .do(() => {
        this.navi.nativeElement.popPage();
      });
    const failed = this.actions$
      .ofType(TodoAction.CREATE_FAILED)
      .do(() => {
        ons.notification.toast({
          message: 'Failed to save',
          timeout: 2000
        });
      });
    Observable.race(success, failed).take(1).subscribe(() => this.spinner.dispatch(new SpinnerAction.Hide()));
  }

  /**
   * Update
   * @param todo
   */
  update(todo: Todo) {
    this.spinner.dispatch(new SpinnerAction.Show());
    this.store.dispatch(new TodoAction.Update(todo));
    const success = this.actions$
      .ofType(TodoAction.UPDATE_SUCCESS)
      .do(() => {
        this.navi.nativeElement.popPage();
      });
    const failed = this.actions$
      .ofType(TodoAction.UPDATE_FAILED)
      .do(() => {
        ons.notification.toast({
          message: 'Failed to save',
          timeout: 2000
        });
      });
    Observable.race(success, failed).take(1).subscribe(() => this.spinner.dispatch(new SpinnerAction.Hide()));
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

  /**
   * Initialize
   */
  ngOnInit() {
    this.todo = Object.assign({}, this.params.data.todo);
  }

}
