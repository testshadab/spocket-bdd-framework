export class SubscriptionPage {
    constructor(page) {
        this.page = page;
        this.higherPlanButton = page.locator("//h2[text()='Unicorn']//following::div[text()='Try for FREE']//parent::button");
        this.upgradeToUnicornButton = page.locator("div[class='claim-button-container'] button");
        this.successUpgradeMsg = page.locator("div[type='success']+div span");
        this.upgradeCurrentPlan = page.locator("(//h2[text()='Unicorn']//following::button/div)[1]");
        this.downgradeCurrentPlan = page.locator("(//h2[text()='Empire']//following::button/div)[1]");
        this.lowerPlanButton = page.locator("//h2[text()='Empire']//following::div[text()='Try for FREE']//parent::button");
        this.downgradeToEmpireButton = page.locator("div[class='claim-button-container'] button");
        this.successDowngradeMsg = page.locator("div[data-testid='downgrade-success']");


        this.settingsButton = page.locator("a[href*='settings/plans'] button");
        this.pricingPlanHeading = page.locator("//a[@href='/settings/membership']//following::h1");
        this.noContinueWithMonthly = page.locator("//a[contains(text(),'continue with monthly')]");

    }


    async navigateToSubscriptionSection() {
        await this.page.waitForTimeout(5000);
        await this.settingsButton.waitFor({ state: 'visible' });
        await this.settingsButton.click();
        await this.page.waitForTimeout(5000);
        // await this.page.waitForLoadState('load');
        await this.pricingPlanHeading.waitFor({ state: 'visible' });
    }

    async upgradePlan() {
        if (await this.higherPlanButton.isVisible()) {
            await this.higherPlanButton.click();
            await this.page.waitForTimeout(3000);
            await this.upgradeToUnicornButton.click();
            await this.page.waitForTimeout(15000);
            if (await this.noContinueWithMonthly.isVisible()) {
                await this.noContinueWithMonthly.click();
            } else {
                console.log('No Continue With Monthly Plan Button not found, moving on...');
            }
        } else {
            await this.lowerPlanButton.click();
            await this.page.waitForTimeout(3000);
            await this.downgradeToEmpireButton.click();
            await this.page.waitForTimeout(15000);
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
            await this.page.waitForTimeout(15000);
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
        const msg = (await this.upgradeCurrentPlan.textContent()).trim();
        console.log('Upgrade message:', msg);
        if (!msg.includes("Current Plan")) {
            throw new Error(`Upgrade message not found! Actual: "${msg}"`);
        }
        console.log('Upgrade success message validated:', msg);
    }

    async downgradePlan() {
        await this.lowerPlanButton.click();
        await this.page.waitForTimeout(3000);
        await this.downgradeToEmpireButton.click();
        await this.page.waitForTimeout(15000);
        if (await this.noContinueWithMonthly.isVisible()) {
            await this.noContinueWithMonthly.click();
        } else {
            console.log('No Continue With Monthly Plan Button not found, moving on...');
        }
    }

    async isDowngradeSuccess() {
        await this.navigateToSubscriptionSection();
        const msg = (await this.downgradeCurrentPlan.textContent()).trim();
        console.log('Downgrade message:', msg);
        if (!msg.includes("Current Plan")) {
            throw new Error(`Downgrade message not found! Actual: "${msg}"`);
        }
        console.log('Downgrade success message validated:', msg);
    }
}
