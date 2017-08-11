import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Page3Component } from './page3.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents: [Page3Component],
  declarations: [Page3Component],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Page3Module { }
