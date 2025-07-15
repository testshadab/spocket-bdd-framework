
import { When, Then } from '@cucumber/cucumber';
import { SubscriptionPage } from '../../../pages/dropshiptool/subscription.page.js';
/** @type {SubscriptionPage} */
let subscriptionPage;

When('dropshiptool user navigates to the subscription or pricing section', async function () {
    subscriptionPage = new SubscriptionPage(this.page);
    await subscriptionPage.navigateToSubscriptionSection();
});

When('dropshiptool user selects a higher plan and confirms the upgrade', async function () {
    await subscriptionPage.upgradePlan();
});

Then('dropshiptool subscription should be successfully upgraded', async function () {
    await subscriptionPage.isUpgradeSuccess();
});

When('dropshiptool user selects a lower plan and confirms the downgrade', async function () {
    await subscriptionPage.downgradePlan();
});

Then('dropshiptool subscription should be successfully downgraded', async function () {
    await subscriptionPage.isDowngradeSuccess();
});