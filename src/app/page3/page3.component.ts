import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { OnsNavigator, Params, onsNotification } from 'ngx-onsenui';

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
  todo$: Observable<Todo>;
  subscription: Subscription;

  constructor(
    private store: Store<TodoReducer.State>,
    private navi: OnsNavigator,
    private params: Params,
  ) {
  }

  /**
   * 保存
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
   * キャンセル
   */
  cancel() {
    this.navi.nativeElement.popPage();
  }

  /**
   * 初期化
   */
  ngOnInit() {
    this.todo = Object.assign({}, this.params.data.todo);
  }

}
