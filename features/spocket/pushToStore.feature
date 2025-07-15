@SmokeTest
Feature: Push to Store functionality

  Background:
    Given Navigate to the spocket application

  @pushToStoreStageTest
  Scenario: Push a product from import list to the store
    When I enter valid username "mohit+qa@spocket.co"
    And I enter valid password "Spocket@2025"
    And I click the login button
    And the user navigates to the products page and add product
    And clicks on the "Push to Store" button for the product
    Then the product should be pushed to the connected store

  # @pushToStoreProdTest
  # Scenario: Push a product from import list to the store
  #   When I enter valid username "mohit+qa@spocket.co"
  #   And I enter valid password "Spocket@2025"
  #   And I click the login button
  #   And the user navigates to the products page and add product
  #   And clicks on the "Push to Store" button for the product
  #   Then the product should be pushed to the connected store
