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
    }
  }
}

/**
 * Mock for Params
 */
class ParamsMock {
}

describe('Page3Component', () => {
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
  }));

  it('should create the page3', async(() => {
    const fixture = TestBed.createComponent(Page3Component);
    const page3 = fixture.debugElement.componentInstance;
    expect(page3).toBeTruthy();
  }));
});
