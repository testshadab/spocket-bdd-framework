import config from '../../configs/config.js';

export class SignUpPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("input[name='email']");
    this.signupButton = page.locator("a[href='/signup']");
    this.nameTxtField = page.locator("input[name='name']");
    this.signupTrialButton = page.locator("button[data-cy='sign-up-button']");
    this.continueWithoutItButton = page.locator("button[title*='Continue without AI']");
    this.categoryWantTosellHeading = page.locator("button[title='Back to previous step']+div p");

  }

  async signUp() {
    await this.page.waitForTimeout(5000);
    await this.signupButton.waitFor({ state: 'visible' });
    await this.signupButton.click();
    const randomEmail = `test${Date.now()}@getnada.com`;
    const randomName = `User${Math.floor(Math.random() * 1000)}`;
    await this.createAccount(randomEmail, randomName);
  }

  async verifyDashboard() {
    await this.shopifyPopups();
    await this.categoryWantTosellHeading.waitFor({ state: 'visible' });
  }

  async createAccount(randomEmail, name) {
    await this.emailInput.fill(randomEmail);
    await this.nameTxtField.fill(name);
    await this.signupTrialButton.click();
  }

  async shopifyPopups() {
    await this.page.waitForTimeout(15000);
    const isVisible = await this.continueWithoutItButton.isVisible();
    if (isVisible) {
      await this.continueWithoutItButton.click();
    } else {
      console.log('ContinueWithoutIt Button not found, moving on...');
    }
  }

}