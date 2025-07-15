import config from '../../configs/config.js';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.continueWithoutItButton = page.locator("button[title*='Continue without AI']");
    this.skipButton = page.locator("//div[contains(text(),'Skip')]//parent::button");
    this.paymentMethodHeading = page.locator("//*[text()='Select payment method']");
    this.cardNumber = page.locator("input[autocomplete='cc-number']");
    this.expirationDate = page.locator("input[autocomplete='cc-exp']");
    this.cvcCode = page.locator("input[autocomplete='cc-csc']");
    this.claimYourTrialButton = page.locator("div[class='claim-button-container'] button");
    this.noContinueWithMonthly = page.locator("//a[contains(text(),'continue with monthly')]");
    this.dashboardHeading = page.locator("//h2[text()='Dashboard']");
    this.iframeSelector = page.locator("div[class='StripeElement'] iframe[name*='__privateStripeFrame']:nth-child(1)");
  }

  // async paymentDetails(cardNum, expirationDate, cvcCode) {
  //   await this.page.waitForTimeout(3000);
  //   await this.selectPayment(cardNum, expirationDate, cvcCode);
  // }

  async verifyDashboard() {

    await this.page.waitForTimeout(3000);
    if (await this.dashboardHeading.isVisible()) {
      console.log('Dashboard is visible');
    } else {
      throw new Error('Dashboard is not visible');
    }
  }

  async skipPopups() {
    if (await this.skipButton.isVisible()) {
      await this.skipButton.click();
      await this.page.waitForTimeout(1000);
    } else {
      console.log('No more skip buttons found.');
    }
  }

  async selectPayment(cardNum, expDate, cvcNum) {
    await this.paymentMethodHeading.waitFor({ state: 'visible' });
    const frameHandle = await this.iframeSelector.elementHandle();
    const frame = await frameHandle.contentFrame();
    await frame.fill("input[autocomplete='cc-number']", String(cardNum));
    await frame.fill("input[autocomplete='cc-exp']", String(expDate));
    await frame.fill("input[autocomplete='cc-csc']", String(cvcNum));
    await this.claimYourTrialButton.click();
    await this.page.waitForTimeout(13000);
    await this.noContinueWithMonthly.click();
  }
}