import { AppPage } from './app.po';

describe('ngx-onsenui-ngrx-todo App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getPage1TitleText()).toEqual('Todos');
  });
});
