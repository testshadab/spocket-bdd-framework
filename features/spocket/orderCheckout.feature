@SmokeTest
Feature: Store Order Checkout and Spocket Verification

  @OrderCheckoutTest
  Scenario Outline: Store order creation and Spocket checkout verification
    Given Navigate to the shopify store application
    When I enter store valid username "mohit+qa1@spocket.co"
    And I enter store valid password "Spocket@2025"
    When I create an order with product "<product>" for customer "<customer>"
    Given Navigate to the spocket application
    When I enter valid username "mohit+qa@spocket.co"
    And I enter valid password "Spocket@2025"
    And I click the login button
    And I navigate to the orders section in Spocket
    Then I should see the order for product "<product>" in the Spocket checkout

    Examples:
      | product                             | customer |
      | Blue Devil Beard Balm - bluedevbalm | Mohit    |
