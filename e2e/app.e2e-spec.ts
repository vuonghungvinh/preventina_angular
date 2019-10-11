import { PreventinaPage } from './app.po';

describe('preventina-new App', () => {
  let page: PreventinaPage;

  beforeEach(() => {
    page = new PreventinaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
