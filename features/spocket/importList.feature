@SmokeTest
Feature: Import list functionality

  Background:
    Given Navigate to the spocket application

  @importListTest
  Scenario: Add a product to the import list
    When I enter valid username "test.shadab21@getnada.com"
    And I enter valid password "Test@1234"
    And I click the login button
    And the user navigates to the products page and add product
    Then the product should be added to the import list
