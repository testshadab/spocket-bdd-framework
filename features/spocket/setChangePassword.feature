@SmokeTest
Feature: Set or Change Password Functionality

  Background:
    Given Navigate to the spocket application
    When I enter valid username "test.shadab21@getnada.com"
    And I enter valid password "Test@1234"
    And I click the login button

  @ChangePasswordTest
  Scenario Outline: Change the password and revert it back
    When the user navigates to the change password section
    And changes the password from old_password to "<new_password>"
    And logs out of the application
    And logs in again using the "<email>" and "<new_password>"
    And changes the password back to the original one "<email>" and "<old_password>"
    Then the user should be able to log in again using the original password
Examples:
      | email                   | old_password | new_password  |
      | test.shadab21@getnada.com | Test@1234    | NewTest@1234  |
