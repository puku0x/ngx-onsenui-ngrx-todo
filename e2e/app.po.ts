import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getOnsNavigator() {
    return element(by.css('ons-navigator')).isDisplayed();
  }

  getPage1TitleText() {
    return element(by.css('ons-page[page1] ons-toolbar div.center')).getText();
  }
}
