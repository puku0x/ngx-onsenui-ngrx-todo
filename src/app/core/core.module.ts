import { NgModule, ModuleWithProviders, Optional, SkipSelf, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TodoService } from './services';
import { RequestInterceptor } from './interceptors';
import { SpinnerComponent } from './components';

/**
 * Core module
 */
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
  ],
  declarations: [
    SpinnerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        TodoService,
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
      ]
    };
  }

  /**
   * Constructor
   * @param parentModule
   */
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
