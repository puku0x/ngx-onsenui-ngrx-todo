import { Component, OnInit } from '@angular/core';
import * as ons from 'onsenui';

import { Page1Component } from './pages/page1/page1.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rootPage = Page1Component;

  constructor() {}

  ngOnInit() {
    //ons.disableAutoStatusBarFill();
  }
}
