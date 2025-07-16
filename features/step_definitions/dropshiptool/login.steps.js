import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../../pages/dropshiptool/login.page.js';
/** @type {LoginPage} */
let loginPage;

Given('Navigate to the dropshiptool application', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
 await this.page.waitForLoadState('load');
});

When('Enter the dropshiptool {string} and pass {string}', async function (username, password) {
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
});

When('I click the dropshiptool login button', async function () {
  await loginPage.clickLoginButton();
});

Then('I should be logged in dropshiptool successfully', async function () {
  await loginPage.verifySuccessAlert();
});


