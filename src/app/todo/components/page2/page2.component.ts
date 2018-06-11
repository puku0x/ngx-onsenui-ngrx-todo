import { Component, ViewChild, EventEmitter, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { OnsNavigator, Params } from 'ngx-onsenui';
import * as ons from 'onsenui';
import { Observable, merge } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

import { ShowSpinner, HideSpinner } from '../../../core/actions';
import {
  TodoActionTypes,
  LoadTodos,
  LoadTodo,
  CreateTodo,
  UpdateTodo,
  DeleteTodo
} from '../../actions';
import * as fromTodo from '../../reducers';
import { Todo } from '../../../models';
import { Page3Component } from '../page3/page3.component';

@Component({
  selector: 'ons-page[page2]',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit, OnDestroy {
  private readonly onDestroy$ = new EventEmitter();

  todo: Todo;
  todo$: Observable<Todo>;
  loading$: Observable<boolean>;

  /**
   * Constructor
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
   * Initialize
   */
  ngOnInit() {
    this.todo = Object.assign({}, this.params.data.todo);
    this.store.dispatch(new LoadTodo({ id: this.todo.id }));
    this.loading$ = this.store.select(fromTodo.getLoading);
    this.todo$ = this.store.select(fromTodo.getTodo);
    this.todo$
      .pipe(
        takeUntil(this.onDestroy$),
        filter(todo => !!todo)
      )
      .subscribe(todo => this.todo = todo);

    // Delete success
    const deleteSuccess = this.actions$
      .pipe(
        ofType(TodoActionTypes.DeleteTodoSuccess),
        tap(() => {
          this.navi.nativeElement.popPage();
        })
      );

    // Delete failure
    const deleteFailure = this.actions$
      .pipe(
        ofType(TodoActionTypes.DeleteTodoFail),
        tap(() => {
          ons.notification.toast({
            message: 'Failed to delete',
            timeout: 2000
          });
        })
      );

    // Hide spinner when delete finished
    merge(deleteSuccess, deleteFailure)
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
    this.store.dispatch(new ShowSpinner());
    this.store.dispatch(new DeleteTodo({ id: todo.id }));
  }

}
