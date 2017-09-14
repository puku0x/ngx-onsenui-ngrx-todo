import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { OnsNavigator, Params } from 'ngx-onsenui';
import * as ons from 'onsenui';

import * as SpinnerAction from '../core/actions/spinner/spinner.action';
import * as SpinnerReducer from '../core/reducers/spinner/spinner.reducer';
import * as TodoAction from '../core/actions/todo/todo.action';
import * as TodoReducer from '../core/reducers/todo/todo.reducer';
import { Todo } from '../interfaces';
import { Page3Component } from '../page3/page3.component';

@Component({
  selector: 'ons-page[page2]',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit, OnDestroy {
  todo: Todo;
  todo$: Observable<Todo>;
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
    private spinner: Store<SpinnerReducer.State>,
    private store: Store<TodoReducer.State>,
    private actions$: Actions,
    private navi: OnsNavigator,
    private params: Params,
  ) {}

  /**
   * Open action sheet
   * @param todo
   */
  openActionSheet(todo: Todo) {
    ons.openActionSheet({
      cancelable: true,
      title: 'Do you want to delete this item ?',
      buttons: [
        { label: 'Delete', icon: 'md-delete', modifier: 'destructive' },
        { label: 'Cancel', icon: 'md-close' }
      ],
    }).then((i: number) => {
      switch (i) {
        case 0:
          this.delete(todo);
          break;
        default:
          break;
      }
    });
  }

  /**
   * Go to edit page
   * @param todo
   */
  edit(todo: Todo) {
    const params = {
      data: {
        todo
      },
      animation: 'lift'
    };
    this.navi.nativeElement.pushPage(Page3Component, params);
  }

  /**
   * Delete
   * @param todo
   */
  delete(todo: Todo) {
    this.spinner.dispatch(new SpinnerAction.Show());
    this.store.dispatch(new TodoAction.Delete(todo.id));
    const success = this.actions$
      .ofType(TodoAction.DELETE_SUCCESS)
      .do(() => {
        this.navi.nativeElement.popPage();
      });
    const failed = this.actions$
      .ofType(TodoAction.DELETE_FAILED)
      .do(() => {
        ons.notification.toast({
          message: 'Failed to delete',
          timeout: 2000
        });
      });
    Observable.race(success, failed).take(1).subscribe(() => this.spinner.dispatch(new SpinnerAction.Hide()));
  }

  /**
   * Initialize
   */
  ngOnInit() {
    this.todo$ = this.store.select(TodoReducer.getTodo);
    this.loading$ = this.store.select(TodoReducer.getLoading);
    this.todo = Object.assign({}, this.params.data.todo);
    this.store.dispatch(new TodoAction.Find(this.todo.id));
    this.todo$
      .takeUntil(this.onDestroy)
      .subscribe(todo => this.todo = todo);
  }

  /**
   * Finalize
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

}
