import { Given, When, Then } from '@cucumber/cucumber';
import { CheckoutPage } from '../../../pages/dropshiptool/checkout.page.js';
/** @type {CheckoutPage} */
let checkoutPage;


When('dropshiptool user enters {string}, {string}, {string} payment details', async function (cardNumber, expirationDate, cvcCode) {
  checkoutPage = new CheckoutPage(this.page);
  // await checkoutPage.shopifyPopups();
  await checkoutPage.skipPopups();
  await checkoutPage.selectPayment(cardNumber, expirationDate, cvcCode);
});

Then('dropshiptool user should be successfully registered and redirected to the home page', async function () {
  await checkoutPage.verifyDashboard();
});


