import config from '../../configs/config.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("input[name='email']");
    this.passwordInput = page.locator("input[name='password']");
    this.loginButton = page.locator("button[data-cy='sign-up-button']");
    this.dashboardElement = page.locator('a[href="/chatllm/"]');
    this.settingsButton = page.locator("(//img[@alt='Settings icon']//ancestor::span)[1]");
    this.logoutButton = page.locator("a[title='Log out']");
    this.signoutButton = page.locator("button[data-heap='account-signout-button']");
    this.logoutOfSpocket = page.locator("button[title='Log out of Spocket']");

  }

  async navigate() {
    await this.page.goto(config.spocketBaseUrl);
  }

  async enterUsername(username) {
    // await this.emailInput.waitFor({ state: 'clickable' , timeout: 10000 });
    await this.emailInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async verifyLogoutCTA() {
    await this.settingsButton.waitFor({ state: 'visible' });
    await this.settingsButton.hover();
    await this.logoutButton.click({ button: 'left' });
    await this.signoutButton.waitFor({ state: 'visible' });
    await this.signoutButton.click();
    await this.logoutOfSpocket.waitFor({ state: 'visible' });
    await this.logoutOfSpocket.click();
    await this.loginButton.waitFor({ state: 'visible' });
    if (!(await this.loginButton.isVisible())) {
      throw new Error('Login button is not visible after logout.');
    }
  }

}