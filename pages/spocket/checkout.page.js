import config from '../../configs/config.js';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.continueWithoutItButton = page.locator("button[title*='Continue without AI']");
    this.skipButton = page.locator("button[title='Skip this step']");
    this.paymentMethodHeading = page.locator("//*[text()='Select payment method']");
    this.cardNumber = page.locator("input[autocomplete='cc-number']");
    this.expirationDate = page.locator("input[autocomplete='cc-exp']");
    this.cvcCode = page.locator("input[autocomplete='cc-csc']");
    this.claimYourTrialButton = page.locator("button[data-heap='payment-page-cta-button']");
    this.noContinueWithMonthly = page.locator("button[title='Continue with monthly plan']");
    this.settingsButton = page.locator("(//img[@alt='Settings icon']//ancestor::span)[1]");
    this.logoutButton = page.locator("a[title='Log out']");
    this.iframeSelector = page.locator("div[class='StripeElement'] iframe[name*='__privateStripeFrame']:nth-child(1)");
  }

  // async paymentDetails(cardNum, expirationDate, cvcCode) {
  //   await this.page.waitForTimeout(3000);
  //   await this.selectPayment(cardNum, expirationDate, cvcCode);
  // }

  async verifyDashboard() {
    await this.page.waitForTimeout(1000);
    await this.settingsButton.waitFor({ state: 'visible' });
    await this.settingsButton.hover();
    await this.logoutButton.click({ button: 'left' });
  }

  async shopifyPopups() {
    await this.page.waitForTimeout(20000);
    if (await this.continueWithoutItButton.isVisible()) {
      await this.continueWithoutItButton.click();
    } else {
      console.log('ContinueWithoutIt Button not found, moving on...');
    }
  }

  async skipPopups(retries = 3) {
    if (retries === 0) return;
    if (await this.skipButton.isVisible()) {
      await this.skipButton.click();
      await this.page.waitForTimeout(4000);
      await this.skipPopups(retries - 1);
    } else {
      console.log('No more skip buttons found.');
    }
  }

  async selectPayment(cardNum, expDate, cvcNum, zipCode, phoneNum) {
    await this.paymentMethodHeading.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(6000);
    const frameHandle = await this.iframeSelector.elementHandle();
    const frame = await frameHandle.contentFrame();
    await this.page.waitForTimeout(3000);
    await frame.fill("input[autocomplete='cc-number']", String(cardNum));
    await this.page.waitForTimeout(5000);
    await frame.fill("input[autocomplete='cc-exp']", String(expDate));
    await this.page.waitForTimeout(2000);
    await frame.fill("input[autocomplete='cc-csc']", String(cvcNum));
    await this.page.waitForTimeout(2000);
    await frame.selectOption('#Field-countryInput', 'US');
       await this.page.waitForTimeout(4000);
    await frame.fill("input[name='postalCode']", String(zipCode));
    await this.page.waitForTimeout(2000);
    await frame.fill("input[name='linkMobilePhone']", String(phoneNum));
    await this.page.waitForTimeout(5000);
    await this.claimYourTrialButton.click();
    await this.page.waitForTimeout(5000);
    await this.noContinueWithMonthly.click();
  }
}