import { Component, OnInit } from '@angular/core';

import { Page1Component } from './todo/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rootPage = Page1Component;
}
