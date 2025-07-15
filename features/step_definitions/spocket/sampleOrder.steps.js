import { Given, When, Then } from '@cucumber/cucumber';
import { SampleOrderPage } from '../../../pages/spocket/sampleOrder.page.js';
/** @type {SampleOrderPage} */
let sampleOrderPage;

When('Click on the product and sample order', async function () {
    sampleOrderPage = new SampleOrderPage(this.page);
    await sampleOrderPage.navigateToItemPage();
});

When('user select the product {string} and sample order', async function (product) {
    sampleOrderPage = new SampleOrderPage(this.page);
    await sampleOrderPage.searchAndNavigateToItem(product);
});

When('Enter the sample order payment details {string}, {string}, {string}', async function (cardNumber, expirationDate, cvcCode) {
    await sampleOrderPage.sampleOrderDetails(cardNumber, expirationDate, cvcCode);
});

When('Enter the sample order payment details {string}, {string}, {string} for the product', async function (cardNumber, expirationDate, cvcCode) {
    await sampleOrderPage.sampleOrderDetailsWithSingleProduct(cardNumber, expirationDate, cvcCode);
});

When('Enter the sample order details {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}', async function (name, lastName, streetAddress, country, state, city, zipCode, phoneNum) {
    await sampleOrderPage.enterOrderDetails(name, lastName, streetAddress, country, state, city, zipCode, phoneNum);
});

Then('Verify the sample order {string} is created successfully', async function (product) {
    await sampleOrderPage.closeOrderConfirmation();
    await sampleOrderPage.verifySampleOrderCreated(product);
});