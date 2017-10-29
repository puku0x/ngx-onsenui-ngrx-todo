import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  NewlinePipe,
  SanitizePipe
} from './pipes';

// Pipes
const pipes = [
  NewlinePipe,
  SanitizePipe,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ...pipes,
  ],
  providers: [],
  exports: [
    ...pipes,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
