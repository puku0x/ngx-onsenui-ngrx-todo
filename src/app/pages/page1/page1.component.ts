import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { race } from 'rxjs/observable/race';
import { take, takeUntil, tap } from 'rxjs/operators';

import * as TodoAction from '../../store/actions/todo/todo.action';
import * as fromTodo from '../../store/reducers/todo/todo.reducer';
import { Todo } from '../../models';
import { Page2Component } from '../page2/page2.component';
import { Page3Component } from '../page3/page3.component';

@Component({
  selector: 'ons-page[page1]',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit, OnDestroy {
  onDestroy = new Subject();
  state = 'initial';
  todos$: Observable<Todo[]>;

  // Content
  @ViewChild('content') private content: ElementRef;

  /**
   * Constructor
   * @param store
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
    // Load all todos
    this.todos$ = this.store.select(fromTodo.getTodos);
    this.load();

    // Scroll bottom when succeeded to create a todo
    this.actions$
      .ofType(TodoAction.CREATE_SUCCESS)
      .pipe(
        takeUntil(this.onDestroy),
        tap(() => this.scrollToBottom())
      ).subscribe();
  }

  /**
   * Finalize
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Callback for 'action' event
   * @param
   */
  onAction($event) {
    this.load();

    // Load done
    const success = this.actions$.ofType(TodoAction.FIND_ALL_SUCCESS);
    const failure = this.actions$.ofType(TodoAction.FIND_ALL_FAILURE);
    race(success, failure).pipe(take(1)).subscribe(() => $event.done());
  }

  /**
   * Callback for 'changestate' event
   * @param
   */
  onChangeState($event) {
    this.state = $event.state;
  }

  /**
   * Load
   */
  load() {
    this.store.dispatch(new TodoAction.FindAll());
  }

  /**
   * Go to detail page
   * @param todo
   */
  detail(todo: Todo) {
    const params = {
      data: {
        todo
      }
    };
    this.navi.nativeElement.pushPage(Page2Component, params);
  }

  /**
   * Go to edit page
   */
  add() {
    const params = {
      data: {
        todo: new Todo(null, '')
      },
      animation: 'lift'
    };
    this.navi.nativeElement.pushPage(Page3Component, params);
  }

  /**
   * Scroll to bottom of page
   */
  scrollToBottom() {
    setTimeout(() => {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    });
  }

}
