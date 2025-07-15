@SmokeTest
Feature: Login functionality

  Background:
    Given Navigate to the spocket application

  @validLoginTest
  Scenario: Successful login with valid credentials
    When I enter valid username "test.shadab21@getnada.com"
    And I enter valid password "Test@1234"
    And I click the login button
    Then I should be logged in successfully
