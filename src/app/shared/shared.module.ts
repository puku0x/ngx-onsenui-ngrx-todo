import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NewlinePipe,
  SanitizePipe
} from './pipes';

// Modules
const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

// Pipes
const pipes = [
  NewlinePipe,
  SanitizePipe,
];

@NgModule({
  imports: [
    ...modules
  ],
  declarations: [
    ...pipes,
  ],
  providers: [],
  exports: [
    ...modules,
    ...pipes,
  ]
})
export class SharedModule { }
