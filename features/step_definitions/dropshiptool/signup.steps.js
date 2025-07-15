import { Given, When, Then } from '@cucumber/cucumber';
import { SignUpPage } from '../../../pages/dropshiptool/signup.page.js';
/** @type {SignUpPage} */
let signUpPage;


When('the user enters the sign up details like name, email, and password', async function () {
  signUpPage = new SignUpPage(this.page);
  await signUpPage.signUp();
});

Then('the user should be successfully registered and redirected to the home page', async function () {
  await signUpPage.verifySuccessRegistrationAlert();
});


