import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { OnsenModule, OnsNavigator, Params } from 'ngx-onsenui';

import { CoreModule } from '../../../core';
import { TodoModule } from '../../todo.module';
import {
  TodoActionTypes,
  LoadTodos,
  CreateTodo,
  UpdateTodo,
  DeleteTodo
} from '../../actions';
import * as fromTodo from '../../reducers';
import { TodoService } from '../../../core/services';
import { Todo } from '../../../models';
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
        OnsenModule,
        CoreModule.forRoot(),
        TodoModule
      ],
      declarations: [],
      providers: [
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
    spyOn(store, 'select').and.callThrough();
    fixture = TestBed.createComponent(Page1Component);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the page1', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should dispatch an action to load data', () => {
    const action = new LoadTodos();
    component.load();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should go to page2, when detail() called', async(() => {
    component.detail(new Todo('1', 'test'));
    expect(navi.component).toEqual(Page2Component);
  }));

  it('should go to page3, when add() called', async(() => {
    component.add();
    expect(navi.component).toEqual(Page3Component);
  }));
});
