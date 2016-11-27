import { VitrageDashboardNg2Page } from './app.po';

describe('vitrage-dashboard-ng2 App', function() {
  let page: VitrageDashboardNg2Page;

  beforeEach(() => {
    page = new VitrageDashboardNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
