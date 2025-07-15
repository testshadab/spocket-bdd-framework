Feature: Sign up functionality

  Background:
    Given Navigate to the dropshiptool application

  @DropshiptoolSignUpTest
  Scenario: Verify the sign up functionality
    When the user enters the sign up details like name, email, and password
    Then the user should be successfully registered and redirected to the home page
