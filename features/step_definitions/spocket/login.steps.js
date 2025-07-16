import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../pages/spocket/login.page.js';
/** @type {LoginPage} */
let loginPage;

Given('Navigate to the spocket application', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('I enter valid username {string}', async function (username) {
  await loginPage.enterUsername(username);
});

When('I enter valid password {string}', async function (password) {
  await loginPage.enterPassword(password);
});


When('I click the login button', async function () {
  await loginPage.clickLoginButton();
  await this.page.waitForTimeout(5000);
});

Then('I should be logged in successfully', async function () {
  await loginPage.verifyLogoutCTA();
  await loginPage.page.waitForTimeout(5000);

});


