import { Given, When, Then } from '@cucumber/cucumber';
import { PushToStore } from '../../../pages/spocket/pushToStore.page.js';
/** @type {PushToStore} */
let pushToStorePage;

When('clicks on the "Push to Store" button for the product', async function () {
    pushToStorePage = new PushToStore(this.page);
    await pushToStorePage.pushToStoreItem();
});

Then('the product should be pushed to the connected store', async function () {
    await pushToStorePage.liveProductsItem();
});