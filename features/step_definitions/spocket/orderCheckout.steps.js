import { Given, When, Then } from '@cucumber/cucumber';
import { OrderCheckoutPage } from '../../../pages/spocket/orderCheckout.page.js';
/** @type {OrderCheckoutPage} */
let orderCheckoutPage;

Given('Navigate to the shopify store application', async function () {
    orderCheckoutPage = new OrderCheckoutPage(this.page);
    await orderCheckoutPage.navigateToStore();
});

When('I enter store valid username {string}', async function (username) {
    await orderCheckoutPage.enterStoreUsername(username);
});

When('I enter store valid password {string}', async function (password) {
    await orderCheckoutPage.enterStorePassword(password);
    await orderCheckoutPage.storeLoginButton.click();
    await this.page.waitForTimeout(15000);
});

When('I create an order with product {string} for customer {string}', async function (product, customer) {
    await orderCheckoutPage.createOrder(product, customer);
});

Given('Navigate to the spocket application in new tab', async function () {
    await orderCheckoutPage.navigateToSpocketApplication();
});

When('I navigate to the orders section in Spocket', async function () {
    await orderCheckoutPage.navigateToSpocketOrders();
});

Then('I should see the order for product {string} in the Spocket checkout', async function (product) {
    await orderCheckoutPage.verifyOrderInSpocketCheckout(product);
});
