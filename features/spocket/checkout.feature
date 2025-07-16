@SmokeTest
Feature: Spocket checkout functionality

  Background:
    Given Navigate to the spocket application

  @CheckoutTest
  Scenario Outline: Verify the checkout functionality
    When spocket user enters the sign up details like email, name
    And the user enters "<cardnumber>", "<expirationDate>", "<cvcCode>", "<zipCode>", "<phoneNum>" payment details
    Then spocket user should be successfully registered and redirected to the home page

    Examples:
      | cardnumber          | expirationDate | cvcCode | zipCode | phoneNum   |
      | 4242 4242 4242 4242 |          12/29 |     123 |   45263 | 7867894242 |
