
export class SetChangePasswordPage {
    constructor(page) {
        this.page = page;
        this.settingsButton = page.locator("a[href*='settings/plans'] button");
        this.pricingPlanHeading = page.locator("//a[@href='/settings/membership']//following::h1");
        this.accountSectionBar = page.locator("a[href='/settings/account']");


        this.logout = page.locator("a[title='Log out']");
        this.passwordHeadingTxt = page.locator("//span[text()='Password']");
        this.oldPasswordTxtField = page.locator("input[placeholder*='Please enter the old password']");
        this.newPasswordTxtField = page.locator("input[placeholder*='Please enter the new password']");
        this.repeatPasswordTxtField = page.locator("input[placeholder*='Please re-enter the new password']");
        this.saveButton = page.locator("//div[text()='Save']//parent::button");
        this.successMsgAlert = page.locator("//span[text()='Your password was updated successfully']");
        this.signout = page.locator("//div[text()='Sign Out']//parent::button");
        this.signoutTxt = page.locator("//span[text()='Sign Out']");
        this.logoutOfSpocket = page.locator("button[title='Log out of Spocket']");
        this.loginCTA = page.locator("button[type='submit']");
        this.email = page.locator("input[type='email']");
        this.password = page.locator("input[type='password']");
        this.successAlert = page.locator("//div[@type='success']//following::div[text()='Login successful']");

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

    async changeThePassword(oldPass, Newpass) {
        await this.page.waitForTimeout(5000);
        await this.passwordHeadingTxt.waitFor({ state: 'visible' });
        await this.oldPasswordTxtField.fill(oldPass);
        await this.page.waitForTimeout(1000);
        await this.newPasswordTxtField.fill(Newpass);
        await this.repeatPasswordTxtField.waitFor({ state: 'visible' });
        await this.repeatPasswordTxtField.fill(Newpass);
        await this.saveButton.click();
        await this.page.waitForTimeout(5000);
    }

    async changeThePasswordWithOldOne(oldPass, Newpass) {
        await this.page.waitForTimeout(5000);
        await this.passwordHeadingTxt.waitFor({ state: 'visible' });
        await this.oldPasswordTxtField.fill(Newpass);
        await this.page.waitForTimeout(1000);
        await this.newPasswordTxtField.fill(oldPass);
        await this.repeatPasswordTxtField.waitFor({ state: 'visible' });
        await this.repeatPasswordTxtField.fill(oldPass);
        await this.saveButton.click();
        await this.page.waitForTimeout(5000);
    }

    async logoutApplication() {
        await this.signout.waitFor({ state: 'visible' });
        await this.signout.click();
        await this.loginCTA.waitFor({ state: 'visible' });
    }

    async loginWithNewPassword(username, newPass) {
        await this.email.fill(username);
        await this.password.fill(newPass);
        await this.loginCTA.click();
    }

    async verifySuccessAlert() {
        await this.successAlert.waitFor({ state: 'visible' });
        const alertText = await this.successAlert.textContent();
        if (!alertText.includes('Login successful')) {
            throw new Error(`Login success message not found! Actual: "${alertText}"`);
        }
    }


    async passwordWithOriginalOne(username, oldPass) {
        await this.email.fill(username);
        await this.password.fill(oldPass);
        await this.loginCTA.click();
    }

    async verifyTheLogoutButton() {
        await this.signoutTxt.scrollIntoViewIfNeeded();
        await this.signout.waitFor({ state: 'visible' });
        const isEnabled = await this.signout.isEnabled();
        if (!isEnabled) {
            throw new Error('Logout button is not enabled!');
        }
    }
}