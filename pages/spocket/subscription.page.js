export class SubscriptionPage {
    constructor(page) {
        this.page = page;
        this.higherPlanButton = page.locator("//p[text()='Unicorn']//following::button");
        this.confirmUpgradeButton = page.locator("button[data-heap='upgrade-modal-add-more-limit-button']");
        this.successUpgradeMsg = page.locator("div[type='success']+div span");
        this.upgradeCurrentPlan = page.locator("//p[text()='Unicorn']//following::span");
        this.downgradeCurrentPlan = page.locator("//p[text()='Empire']//following::span");
        this.lowerPlanButton = page.locator("//p[text()='Empire']//following::button[@title='Downgrade']");
        this.confirmDowngradeButton = page.locator("button[data-heap='upgrade-modal-add-more-limit-button']");
        this.successDowngradeMsg = page.locator("div[data-testid='downgrade-success']");


        this.settingsButton = page.locator("(//img[@alt='Settings icon']//ancestor::span)[1]");
        this.plans = page.locator("a[title='Plans']");
        this.noContinueWithMonthly = page.locator("button[title='Continue with monthly plan']");

    }


    async navigateToSubscriptionSection() {
        await this.page.waitForTimeout(5000);
        await this.settingsButton.waitFor({ state: 'visible' });
        await this.settingsButton.click();
        await this.page.waitForTimeout(8000);
        // await this.page.waitForLoadState('load');
        await this.plans.waitFor({ state: 'visible' });
    }

    async upgradePlan() {
        if (await this.higherPlanButton.isVisible()) {
            await this.higherPlanButton.click();
            await this.page.waitForTimeout(3000);
            await this.confirmUpgradeButton.click();
            await this.page.waitForTimeout(8000);
            if (await this.noContinueWithMonthly.isVisible()) {
                await this.noContinueWithMonthly.click();
            } else {
                console.log('No Continue With Monthly Plan Button not found, moving on...');
            }
        } else {
            await this.lowerPlanButton.click();
            await this.page.waitForTimeout(3000);
            await this.confirmDowngradeButton.click();
            await this.page.waitForTimeout(8000);
            if (await this.noContinueWithMonthly.isVisible()) {
                await this.noContinueWithMonthly.click();
            } else {
                console.log('No Continue With Monthly Plan Button not found, moving on...');
            }
            this.isDowngradeSuccess();
            await this.page.waitForTimeout(3000);
            await this.higherPlanButton.click();
            await this.page.waitForTimeout(3000);
            await this.confirmUpgradeButton.click();
            await this.page.waitForTimeout(8000);
            if (await this.noContinueWithMonthly.isVisible()) {
                await this.noContinueWithMonthly.click();
            } else {
                console.log('No Continue With Monthly Plan Button not found, moving on...');
            }
        }

    }

    async isUpgradeSuccess() {
        // await this.successUpgradeMsg.waitFor({ state: 'visible' });
        // const msg = await this.successUpgradeMsg.textContent();
        // if (!msg.includes("You're on Unicorn now!")) {
        //     throw new Error(`Upgrade message not found! Actual: "${msg}"`);
        // }
        // console.log('Upgrade success message validated:', msg);
        await this.navigateToSubscriptionSection();
        await this.page.reload();
        const msg = (await this.upgradeCurrentPlan.textContent()).trim();
        console.log('Upgrade message:', msg);
        if (!msg.includes("Your current plan")) {
            throw new Error(`Upgrade message not found! Actual: "${msg}"`);
        }
        console.log('Upgrade success message validated:', msg);
    }

    async downgradePlan() {
        await this.lowerPlanButton.click();
        await this.page.waitForTimeout(3000);
        await this.confirmDowngradeButton.click();
        await this.page.waitForTimeout(10000);
        if (await this.noContinueWithMonthly.isVisible()) {
            await this.noContinueWithMonthly.click();
        } else {
            console.log('No Continue With Monthly Plan Button not found, moving on...');
        }
    }

    async isDowngradeSuccess() {
        await this.navigateToSubscriptionSection();
        await this.page.reload();
        const msg = (await this.downgradeCurrentPlan.textContent()).trim();
        console.log('Downgrade message:', msg);
        if (!msg.includes("Your current plan")) {
            throw new Error(`Downgrade message not found! Actual: "${msg}"`);
        }
        console.log('Downgrade success message validated:', msg);
    }
}
