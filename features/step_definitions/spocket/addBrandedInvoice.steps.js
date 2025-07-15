import { When, Then } from '@cucumber/cucumber';
import { BrandedInvoicePage } from '../../../pages/spocket/brandedInvoice.page.js';
/** @type {BrandedInvoicePage} */
let brandedInvoicePage;

When('the user navigates to the branded invoice settings page', async function () {
    brandedInvoicePage = new BrandedInvoicePage(this.page);
    await brandedInvoicePage.navigateToBrandedInvoiceSettings();
});

When('the user download the branded invoice template', async function () {
    await brandedInvoicePage.downloadFile();
});

Then('the branded invoice template should be downloaded successfully', async function () {
    await brandedInvoicePage.validateDownloadedFile('Invoice-CJV0TOY2');
});