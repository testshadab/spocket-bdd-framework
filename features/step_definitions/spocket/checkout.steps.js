import { Given, When, Then } from '@cucumber/cucumber';
import { CheckoutPage } from '../../../pages/spocket/checkout.page.js';
/** @type {CheckoutPage} */
let checkoutPage;


When('the user enters {string}, {string}, {string} payment details', async function (cardNumber, expirationDate, cvcCode) {
  checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.shopifyPopups();
  await checkoutPage.skipPopups();
  await checkoutPage.selectPayment(cardNumber, expirationDate, cvcCode);
});

Then('spocket user should be successfully registered and redirected to the home page', async function () {
  await checkoutPage.verifyDashboard();

});


