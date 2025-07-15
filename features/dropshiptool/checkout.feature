Feature: Checkout test functionality

  Background:
    Given Navigate to the dropshiptool application

  @DropshiptoolCheckoutTest
  Scenario: Verify the sign up functionality
    When the user enters the sign up details like name, email, and password
    And dropshiptool user enters "<cardnumber>", "<expirationDate>", "<cvcCode>" payment details
    Then dropshiptool user should be successfully registered and redirected to the home page

    Examples:
      | cardnumber          | expirationDate | cvcCode |
      | 4242 4242 4242 4242 |          12/29 |     123 |
