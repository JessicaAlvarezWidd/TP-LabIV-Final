import { PizzeriaArgentaPage } from './app.po';

describe('pizzeria-argenta App', () => {
  let page: PizzeriaArgentaPage;

  beforeEach(() => {
    page = new PizzeriaArgentaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
