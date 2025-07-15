import config from '../../configs/config.js';

export class OrderCheckoutPage {
  constructor(page) {
    this.page = page;
    // Locators for store login
    this.storeEmailInput = page.locator("input[type='email']");
    this.continueWithEmailButton = page.locator("button[type='submit']");
    this.storePasswordInput = page.locator("input[id='account_password']");
    this.storeLoginButton = page.locator("button[type='submit']");
    this.storeHomePage = page.locator("(//span[text()='Home']//parent::span)[1]");
    this.storeOrdersSection = page.locator("(//span[text()='Orders']//parent::span)[1]");
    this.createStoreOrderButton = page.locator("//span[text()='Create order']//ancestor::div[contains(@class,'Polaris-Box Polaris-Box--printHidden')]");
    this.productSearchInput = page.locator("input[id='productPicker']");
    this.productCheckbox = page.locator("//input[contains(@class,'Polaris-Checkbox')]//ancestor::div[@class='Polaris-InlineStack']");
    this.productAddButton = page.locator("//span[text()='Add']//parent::button");
    this.customerNameInput = page.locator("input[placeholder='Search or create a customer']");
    this.selectCustomer = page.locator("//li[@role='option']//following::span[contains(@class,'Name')]");
    this.editCustomerButton = page.locator("button[aria-label='Edit customer']");
    this.editAddressButton = page.locator("button[aria-label='Edit shipping address']");
    this.updateAddressInput = page.locator("input[name='address1']");
    this.selectUpdateAddressDropdown = page.locator("div[class='Polaris-Autocomplete-MappedOption__Content']");
    this.useCurrentButton = page.locator("//span[text()='Use current']//parent::button");
    this.markAsPaidButton = page.locator("//span[text()='Mark as paid']//parent::button");
    this.createOrderButton = page.locator("//span[text()='Create order']//parent::button");
    this.ordersSectionButton = page.locator("(//p[text()='Orders'])[1]//parent::a");
    this.orderRow = page.locator("((//p[text()='Title'])[1]//following::p)[1]");
    this.checkoutButton = page.locator("(//p[text()='Title']//following::p//following::button)[1]");
    this.confirmOrderButton = page.locator("//div[text()='Confirm']//parent::button");
    this.paymentCompleteMessage = page.locator("//div[contains(@class,'modal-text')]//descendant::strong");

  }

  async navigateToStore() {
    await this.page.goto(config.shopifyBaseUrl);
  }

  async enterStoreUsername(username) {
    await this.storeEmailInput.fill(username);
    await this.continueWithEmailButton.click();
    await this.page.waitForTimeout(5000);
  }

  async enterStorePassword(password) {
    await this.storePasswordInput.fill(password);
  }

  async createOrder(product, customer) {
    await this.storeHomePage.waitFor({ state: 'visible' });
    await this.storeOrdersSection.click();
    await this.page.waitForTimeout(2000);
    await this.createStoreOrderButton.waitFor({ state: 'visible' });
    await this.createStoreOrderButton.click();
    await this.page.waitForTimeout(4000);
    await this.productSearchInput.fill(product);
    await this.page.waitForTimeout(4000);
    await this.productCheckbox.click();
    await this.page.waitForTimeout(4000);
    await this.productAddButton.click();
    await this.page.waitForTimeout(4000);
    await this.customerNameInput.fill(customer);
    await this.selectCustomer.waitFor({ state: 'visible' });
    await this.selectCustomer.first().click();
    await this.page.waitForTimeout(5000);
    await this.editCustomerButton.click();
    await this.page.waitForTimeout(5000);
    await this.editAddressButton.click();
    await this.page.waitForTimeout(5000);
    await this.updateAddressInput.clear();
    await this.updateAddressInput.fill('World Trade Center');
    await this.page.waitForTimeout(2000);
    await this.selectUpdateAddressDropdown.first().click();
    await this.page.waitForTimeout(5000);
    await this.useCurrentButton.click();
    await this.markAsPaidButton.waitFor({ state: 'visible' });
    await this.markAsPaidButton.click();
    await this.createOrderButton.waitFor({ state: 'visible' });
    await this.createOrderButton.click();
    await this.page.waitForTimeout(3000);
  }

  async navigateToSpocketOrders() {
    await this.ordersSectionButton.waitFor({ state: 'visible' });
    await this.ordersSectionButton.click();
  }

  async verifyOrderInSpocketCheckout(product) {
    await this.orderRow.waitFor({ state: 'visible' });
    const orderText = await this.orderRow.textContent();
    if (!orderText.includes(product)) {
      throw new Error(`Order for product "${product}" not found in Spocket checkout.`);
    }
    console.log(`Order for product "${product}" found in Spocket checkout.`);
    await this.page.waitForTimeout(1000);
    await this.checkoutButton.click();
    await this.page.waitForTimeout(8000);
    await this.confirmOrderButton.waitFor({ state: 'visible' });
    await this.confirmOrderButton.click();
    await this.page.waitForTimeout(5000);
    const paymentMessage = await this.paymentCompleteMessage.textContent();
    if (!paymentMessage.includes("Payment Completed")) {
      throw new Error(`Payment confirmation message not found! Actual: "${paymentMessage}"`);
    }
    console.log('Order confirmed and payment completed successfully.');
  }

}