import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { OnsNavigator, Params } from 'ngx-onsenui';

import * as TodoAction from '../core/actions/todo.action';
import * as TodoReducer from '../core/reducers/todo.reducer';
import { Todo } from '../interfaces';
import { Page2Component } from '../page2/page2.component';
import { Page3Component } from '../page3/page3.component';

@Component({
  selector: 'ons-page[page1]',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  todos$: Observable<Todo[]>;

  /**
   * Constructor
   * @param store
   * @param navi
   * @param params
   */
  constructor(
    private store: Store<TodoReducer.State>,
    private navi: OnsNavigator,
    private params: Params,
  ) {
    this.todos$ = store.select(TodoReducer.getTodos);
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
   * Initialize
   */
  ngOnInit() {
    this.store.dispatch(new TodoAction.FindAll());
  }

}
