import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OnsenModule } from 'ngx-onsenui';

import { SharedModule } from '../shared';
import * as fromTodo from './reducers';
import { TodoEffects } from './effects';
import { Page1Component, Page2Component, Page3Component } from './components';

// Components
const pages = [
  Page1Component,
  Page2Component,
  Page3Component
];

@NgModule({
  imports: [
    OnsenModule,
    StoreModule.forFeature('todo', fromTodo.reducers),
    EffectsModule.forFeature([TodoEffects]),
    SharedModule,
  ],
  declarations: [
    ...pages
  ],
  entryComponents: [
    ...pages
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodoModule { }
