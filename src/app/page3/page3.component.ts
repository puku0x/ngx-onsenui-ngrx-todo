import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OnsNavigator, Params } from 'ngx-onsenui';

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
  ) { }

  /**
   * Save a ToDo
   * @param todo
   */
  save(todo) {
    if (todo.id) {
      this.store.dispatch(new TodoAction.Update(todo));
    } else {
      this.store.dispatch(new TodoAction.Create(todo));
    }
    this.navi.nativeElement.popPage();
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
