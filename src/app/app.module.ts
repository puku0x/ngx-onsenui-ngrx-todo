import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OnsenModule } from 'ngx-onsenui';

import { CoreModule } from './core/core.module';
import { Page1Module } from './page1/page1.module';
import { Page2Module } from './page2/page2.module';
import { Page3Module } from './page3/page3.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OnsenModule,
    CoreModule.forRoot(),
    Page1Module,
    Page2Module,
    Page3Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
