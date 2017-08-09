import { ProfileProjectAngularPage } from './app.po';

describe('profile-project-angular App', () => {
  let page: ProfileProjectAngularPage;

  beforeEach(() => {
    page = new ProfileProjectAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
