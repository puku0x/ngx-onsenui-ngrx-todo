import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Rx';
import { OnsenModule, OnsNavigator, Params } from 'ngx-onsenui';

import { reducers } from '../../store/reducers';
import { effects } from '../../store/effects';
import * as TodoAction from '../../store/actions/todo/todo.action';
import * as fromTodo from '../../store/reducers/todo/todo.reducer';
import { TodoService } from '../../core/services';
import { Todo } from '../../models';
import { Page3Component } from './page3.component';
import { Page1Component } from '../page1/page1.component';
import { Page2Component } from '../page2/page2.component';

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
    },
    popPage: () => {
      this.component = Page2Component;
    }
  };
}

/**
 * Mock for Params
 */
class ParamsMock {
}

describe('Page3Component', () => {
  let component: Page3Component;
  let fixture: ComponentFixture<Page3Component>;
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
        Page3Component,
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
    fixture = TestBed.createComponent(Page3Component);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the page3', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should dispatch an action to create data', () => {
    const todo = new Todo(null, 'test');
    const action = new TodoAction.Create(todo);
    component.create(todo);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an action to update data', () => {
    const todo = new Todo(1, 'test');
    const action = new TodoAction.Update(todo);
    component.update(todo);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should go to page2, when cancel() called', async(() => {
    component.cancel();
    expect(navi.component).toEqual(Page2Component);
  }));

});
