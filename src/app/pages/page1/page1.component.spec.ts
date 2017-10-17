import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OnsenModule, OnsNavigator, Params } from 'ngx-onsenui';

import { reducers } from '../../store/reducers';
import { effects } from '../../store/effects';
import * as TodoAction from '../../store/actions/todo/todo.action';
import * as fromTodo from '../../store/reducers/todo/todo.reducer';
import { TodoService } from '../../core/services';
import { Todo } from '../../models';
import { Page1Component } from './page1.component';
import { Page2Component } from '../page2/page2.component';
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
  };
}

/**
 * Mock for Params
 */
class ParamsMock {
}

describe('Page1Component', () => {
  let component: Page1Component;
  let fixture: ComponentFixture<Page1Component>;
  let store: Store<fromTodo.State>;
  let navi: OnsNavigatorMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
        OnsenModule,
      ],
      declarations: [
        Page1Component,
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
    fixture = TestBed.createComponent(Page1Component);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the page1', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should change the message', async(() => {
    component.onChangeState({state: 'initial'});
    expect(component.message).toEqual('Pull down to refresh');
    component.onChangeState({state: 'preaction'});
    expect(component.message).toEqual('Release to refresh');
    component.onChangeState({state: 'action'});
    expect(component.message).toEqual('Loading data...');
  }));

  it('should dispatch an action to load data', () => {
    const action = new TodoAction.FindAll();
    component.load();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should go to page2, when detail() called', async(() => {
    component.detail(new Todo(1, 'test'));
    expect(navi.component).toEqual(Page2Component);
  }));

  it('should go to page3, when add() called', async(() => {
    component.add();
    expect(navi.component).toEqual(Page3Component);
  }));
});
