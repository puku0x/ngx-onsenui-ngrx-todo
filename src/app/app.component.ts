import { Component } from '@angular/core';
import { Page1Component } from './pages/page1/page1.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rootPage = Page1Component;

  constructor() {}
}
