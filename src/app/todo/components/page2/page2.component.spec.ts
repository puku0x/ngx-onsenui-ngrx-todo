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
  };
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
  // let actions: Observable<any>;
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
    fixture = TestBed.createComponent(Page2Component);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the page2', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should go to page3, when edit() called', async(() => {
    component.edit(new Todo('1', 'test'));
    expect(navi.component).toEqual(Page3Component);
  }));

  it('should dispatch an action to delete data', () => {
    const todo = new Todo('1', 'test');
    const action = new DeleteTodo({ id: todo.id });
    component.delete(todo);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
