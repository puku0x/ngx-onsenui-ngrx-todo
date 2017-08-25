import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
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
export class Page3Component implements OnInit, OnDestroy {
  todo: Todo;
  todo$: Observable<Todo>;
  loading$: Observable<boolean>;
  subscription: Subscription;

  @ViewChild('modal') modal;

  constructor(
    private store: Store<TodoReducer.State>,
    private navi: OnsNavigator,
    private params: Params,
  ) { }

  onValueChange(content: string) {
    console.log(content);

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
    this.loading$ = this.store.select(TodoReducer.getLoading);

    // this.loading$.subscribe(loading => {
    //   this.modal.show();
    // });
  }

  ngOnDestroy() {

  }

}
