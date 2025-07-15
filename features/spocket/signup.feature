@SmokeTest
Feature: Sign up functionality

  Background:
    Given Navigate to the spocket application
    
  @SignUpTest
  Scenario: Verify the sign up functionality
    When spocket user enters the sign up details like email, name
    Then the user should be successfully registered

  # @SignUpTest
  # Scenario Outline: Verify the sign up functionality
  #   When spocket user enters the sign up details like email, name
  #   And the user enters "<cardnumber>", "<expirationDate>", "<cvcCode>" payment details
  #   Then spocket user should be successfully registered and redirected to the home page

  #   Examples:
  #     | cardnumber          | expirationDate | cvcCode |
  #     | 4242 4242 4242 4242 |          12/29 |     123 |
