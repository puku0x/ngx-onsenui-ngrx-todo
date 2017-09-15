import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OnsenModule, OnsNavigator, Params } from 'ngx-onsenui';

import { effects } from '../core/effects';
import { reducers } from '../core/reducers';
import { TodoService } from '../core/services/todo.service';
import { Todo } from '../interfaces';
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
  }
}

/**
 * Mock for Params
 */
class ParamsMock {
}

describe('Page1Component', () => {
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
  }));

  it('should create the page1', async(() => {
    const fixture = TestBed.createComponent(Page1Component);
    const page1 = fixture.debugElement.componentInstance;
    expect(page1).toBeTruthy();
  }));

  it('should change the message', async(() => {
    const fixture = TestBed.createComponent(Page1Component);
    const page1 = fixture.debugElement.componentInstance;
    page1.onChangeState({state: 'initial'});
    expect(page1.message).toEqual('Pull down to refresh');
    page1.onChangeState({state: 'preaction'});
    expect(page1.message).toEqual('Release to refresh');
    page1.onChangeState({state: 'action'});
    expect(page1.message).toEqual('Loading data...');
  }));

  it('should go to page2, when detail() called', async(() => {
    const fixture = TestBed.createComponent(Page1Component);
    const page1 = fixture.debugElement.componentInstance;
    page1.detail(new Todo(1, 'test'));
    expect(navi.component).toEqual(Page2Component);
  }));

  it('should go to page3, when add() called', async(() => {
    const fixture = TestBed.createComponent(Page1Component);
    const page1 = fixture.debugElement.componentInstance;
    page1.add();
    expect(navi.component).toEqual(Page3Component);
  }));
});
