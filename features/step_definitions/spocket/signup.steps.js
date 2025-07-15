import { When, Then } from '@cucumber/cucumber';
import { SignUpPage } from '../../../pages/spocket/signup.page.js';
/** @type {SignUpPage} */
let signUpPage;

When('spocket user enters the sign up details like email, name', async function () {
  signUpPage = new SignUpPage(this.page);
  await signUpPage.signUp();
});

Then('the user should be successfully registered', async function () {
  await signUpPage.verifyDashboard();
});