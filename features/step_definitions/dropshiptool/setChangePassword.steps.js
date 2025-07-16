import { Given, When, Then } from '@cucumber/cucumber';
import { SetChangePasswordPage } from '../../../pages/dropshiptool/setChangePassword.page.js';
/** @type {SetChangePasswordPage} */
let setChangePasswordPage;

When('the user navigates to the dropshiptool change password section', async function () {
  setChangePasswordPage = new SetChangePasswordPage(this.page);
  await setChangePasswordPage.navigateToAccountSection();
});

When('changes the dropshiptool password from old_password to {string}', async function (newPassword) {
  await setChangePasswordPage.changeThePassword(newPassword);
});

When('logs out of the application', async function () {
  await setChangePasswordPage.logoutApplication();
});

When('logs in again using the {string} and {string}', async function (email, newPassword) {
  await setChangePasswordPage.loginWithNewPassword(email, newPassword);
  await setChangePasswordPage.navigateToAccountSection();

});

When('changes the password back to the original one {string} and {string}', async function (email, oldPassword) {
  await setChangePasswordPage.changeThePassword(oldPassword);
  await setChangePasswordPage.logoutApplication();
  await setChangePasswordPage.passwordWithOriginalOne(email, oldPassword);
});

Then('the user should be able to log in again using the original password', async function () {
  await setChangePasswordPage.verifyTheLogoutButton();
});