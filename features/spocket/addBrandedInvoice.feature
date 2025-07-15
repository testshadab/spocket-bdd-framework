@SmokeTest
Feature: Branded Invoice Management

  Background:
    Given Navigate to the spocket application
    When I enter valid username "test.shadab21@getnada.com"
    And I enter valid password "Test@1234"
    And I click the login button

  @AddBrandedInvoiceTest
  Scenario: Add a branded invoice with custom store details
    When the user navigates to the branded invoice settings page
    And the user download the branded invoice template
    Then the branded invoice template should be downloaded successfully
