
export class SetChangePasswordPage {
    constructor(page) {
        this.page = page;
        this.settingsButton = page.locator("a[href*='settings/plans'] button");
        this.pricingPlanHeading = page.locator("//a[@href='/settings/membership']//following::h1");
        this.accountSectionBar = page.locator("a[href='/settings/account']");


        this.logout = page.locator("a[title='Log out']");
        this.newPasswordTxtField = page.locator("input[placeholder*='Please enter the new password']");
        this.repeatPasswordTxtField = page.locator("input[placeholder*='Please re-enter the new password']");
        this.saveButton = page.locator("button[data-heap='account-update-password-cta-button']");
        this.successMsgAlert = page.locator("//span[text()='Your password was updated successfully']");
        this.signout = page.locator("button[data-heap='account-signout-button']");
        this.logoutOfSpocket = page.locator("button[title='Log out of Spocket']");
        this.loginCTA = page.locator("button[data-cy='sign-up-button']");
        this.email = page.locator("input[name='email']");
        this.password = page.locator("input[name='password']");
        this.spocketLogo = page.locator("a[data-heap='sidebar-desktop-logo-link']");


    }

    async navigateToAccountSection() {
        await this.page.waitForTimeout(5000);
        await this.settingsButton.waitFor({ state: 'visible' });
        await this.settingsButton.click();
        await this.pricingPlanHeading.waitFor({ state: 'visible' });
        await this.accountSectionBar.waitFor({ state: 'visible' });
        await this.accountSectionBar.click();
        await this.page.waitForTimeout(5000);
    }

    async changeThePassword(pass) {
        await this.newPasswordTxtField.waitFor({ state: 'visible' });
        await this.newPasswordTxtField.fill(pass);
        await this.repeatPasswordTxtField.waitFor({ state: 'visible' });
        await this.repeatPasswordTxtField.fill(pass);
        await this.saveButton.click();
    }

    async logoutApplication() {
        await this.page.waitForTimeout(10000);
        await this.signout.waitFor({ state: 'visible' });
        await this.signout.click();
        await this.logoutOfSpocket.waitFor({ state: 'visible' });
        await this.logoutOfSpocket.click();
        await this.loginCTA.waitFor({ state: 'visible' });
    }

    async loginWithNewPassword(username, newPass) {
        await this.email.fill(username);
        await this.password.fill(newPass);
        await this.loginCTA.click();
        await this.spocketLogo.first().waitFor({ state: 'visible' });
    }

    async passwordWithOriginalOne(username, oldPass) {
        await this.email.fill(username);
        await this.password.fill(oldPass);
        await this.loginCTA.click();
    }

    async verifyTheLogoutButton() {
        await this.page.waitForTimeout(5000);
        await this.settingsButton.waitFor({ state: 'visible' });
        await this.settingsButton.hover();
        await this.logout.waitFor({ state: 'visible' });
    }
}