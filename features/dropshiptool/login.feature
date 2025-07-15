Feature: Login functionality

  Background:
    Given Navigate to the dropshiptool application

  @DropshiptoolLogintest
  Scenario: Verify the login functionality
    When Enter the dropshiptool "test.shadab211@getnada.com" and pass "Test@1234"
    And I click the dropshiptool login button
    Then I should be logged in dropshiptool successfully
