import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Rx';
import { OnsenModule, OnsNavigator, Params } from 'ngx-onsenui';

import { reducers } from '../reducers';
import { effects } from '../effects';
import * as TodoAction from '../actions/todo/todo.action';
import * as fromTodo from '../reducers/todo/todo.reducer';
import { TodoService } from '../core/services/todo.service';
import { Todo } from '../models';
import { Page2Component } from './page2.component';
import { Page1Component } from '../page1/page1.component';
import { Page3Component } from '../page3/page3.component';

/**
 * Mock for OnsNavigator
 */
class OnsNavigatorMock {
  component: any;
  params: any;
  nativeElement = {
    pushPage: (component, params) => {
      this.component = component;
      this.params = params;
    }
  }
}

/**
 * Mock for Params
 */
class ParamsMock {
}

describe('Page2Component', () => {
  let component: Page2Component;
  let fixture: ComponentFixture<Page2Component>;
  let store: Store<fromTodo.State>;
  let actions: Observable<any>;
  let navi: OnsNavigatorMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
        OnsenModule,
      ],
      declarations: [
        Page2Component,
      ],
      providers: [
        Store,
        {
          provide: TodoService,
          useValue: jasmine.createSpyObj('TodoService', ['findAll', 'find', 'create', 'update', 'delete']),
        },
        { provide: OnsNavigator, useClass: OnsNavigatorMock },
        { provide: Params, useClass: ParamsMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    navi = TestBed.get(OnsNavigator);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(Page2Component);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the page2', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should go to page3, when edit() called', async(() => {
    component.edit(new Todo(1, 'test'));
    expect(navi.component).toEqual(Page3Component);
  }));

  it('should dispatch an action to delete data', () => {
    const todo = new Todo(1, 'test');
    const action = new TodoAction.Delete(todo.id);
    component.delete(todo);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
