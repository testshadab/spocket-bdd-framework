import config from '../../configs/config.js';


export class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator("input[type='email']");
    this.password = page.locator("input[type='password']");
    this.loginCTA = page.locator("button[type='submit']");
    this.successAlert = page.locator("//div[@type='success']//following::div[text()='Login successful']");
    this.createAnAccountButton = page.locator("a[href='/register']");
    this.nameTxtField = page.locator("input[placeholder='Yourname']");
    this.getStartedButton = page.locator("button[type='submit']");
    this.successRegisteredAlert = page.locator("div[class='sc-kAyceB UyUtc']");
    this.skipButton = page.locator("button[color='textSecondary']");
    this.paymentMethodHeading = page.locator("//h2[text()='Select payment method']");
    this.cardNumber = page.locator("input[autocomplete='cc-number']");
    this.expirationDate = page.locator("input[autocomplete='cc-exp']");
    this.cvcCode = page.locator("input[autocomplete='cc-csc']");
    this.claimYourTrialButton = page.locator("button[color='white']");
    this.noContinueWithMonthly = page.locator("a[class='sc-lizKOf RDKiF']");
    this.dashboard = page.locator("button[color='primary']");
    this.iframeSelector = page.locator(".__PrivateStripeElement > iframe");
  }


  async navigate() {
    await this.page.goto(config.dropshiptoolBaseUrl);
  }

  async enterUsername(username) {
    await this.email.fill(username);
  }

  async enterPassword(password) {
    await this.password.fill(password);
  }

  async clickLoginButton() {
    await this.loginCTA.click();
  }

  async verifySuccessAlert() {
    await this.successAlert.waitFor({ state: 'visible' });
    const alertText = await this.successAlert.textContent();
    if (!alertText.includes('Login successful')) {
      throw new Error(`Login success message not found! Actual: "${alertText}"`);
    }
  }

  async signUp() {
    await this.createAnAccountButton.waitFor({ state: 'visible' });
    await this.createAnAccountButton.click();
    const randomEmail = `test${Date.now()}@getnada.com`;
    const randomName = `User${Math.floor(Math.random() * 1000)}`;
    await this.createAFREEAccount(randomEmail, randomName);
  }

  async verifyDashboard(paymentData) {
    await this.page.waitForTimeout(3000);
    await this.skipPopups();
    await this.selectPayment(paymentData.Cardnumber, paymentData.expirationDate, paymentData.cvcCode);
  }

  async createAFREEAccount(randomEmail, name) {
    await this.emailInput.fill(randomEmail);
    await this.nameTxtField.fill(name);
    await this.getStartedButton.click();
    await this.successRegisteredAlert.waitFor({ state: 'visible' });
    const alertText = await this.successRegisteredAlert.textContent();
    if (!alertText.includes('Successfully registered')) {
      throw new Error(`Registration success message not found! Actual: "${alertText}"`);
    }
  }

  async skipPopups() {
    if (await this.skipButton.isVisible()) {
      await this.skipButton.click();
    } else {
      console.log('Skip button not found, moving on...');
    }
  }

  async selectPayment(cardNum, expDate, cvcNum) {
    await this.paymentMethodHeading.waitFor({ state: 'visible' });
    const frames = this.page.frames();
    let stripeFrame;
    for (const frame of frames) {
      if (frame.url().includes('stripe')) {
        stripeFrame = frame;
        break;
      }
    }
    if (!stripeFrame) throw new Error('Stripe iframe not found');
    await stripeFrame.fill(LoginPageLocators.cardNumber, cardNum);
    await stripeFrame.fill(LoginPageLocators.expirationDate, expDate);
    await stripeFrame.fill(LoginPageLocators.cvcCode, cvcNum);
    await this.claimYourTrialButton.click();
    await this.noContinueWithMonthly.waitFor({ state: 'visible' });
    await this.noContinueWithMonthly.click();
    await this.dashboard.waitFor({ state: 'visible' });
  }
}
