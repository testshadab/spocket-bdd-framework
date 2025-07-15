@SmokeTest
Feature: Sample Order functionality

  Background:
    Given Navigate to the spocket application
    When I enter valid username "test.shadab21@getnada.com"
    And I enter valid password "Test@1234"
    And I click the login button
  # @sampleOrderTest
  # Scenario Outline: Verify the sample order functionality
  #   When Click on the product and sample order
  #   And Enter the sample order payment details "<cardnumber>", "<expirationDate>", "<cvcCode>"
  #   And Enter the sample order details "<name>", "<lastName>", "<streetAddress>", "<country>", "<state>", "<city>", "<zipCode>", "<phoneNum>"
  #   # Then Verify the sample order is created successfully
  #   Examples:
  #     | cardnumber          | expirationDate | cvcCode | name | lastName | streetAddress | country   | state | city        | zipCode | phoneNum   |
  #     | 4242 4242 4242 4242 |          12/29 |     123 | John | Doe      |    123 Elm St | Australia | CA    | Los Angeles |   90001 | 1234567890 |

  @sampleOrderTest
  Scenario Outline: Verify the sample order functionality
    When user select the product "<product>" and sample order
    And Enter the sample order payment details "<cardnumber>", "<expirationDate>", "<cvcCode>" for the product
    And Enter the sample order details "<name>", "<lastName>", "<streetAddress>", "<country>", "<state>", "<city>", "<zipCode>", "<phoneNum>"
    Then Verify the sample order "<product>" is created successfully

    Examples:
      | product                             | cardnumber          | expirationDate | cvcCode | name | lastName | streetAddress | country   | state | city        | zipCode | phoneNum   |
      | Blue Devil Beard Balm - bluedevbalm | 4242 4242 4242 4242 |          12/29 |     123 | John | Doe      |    123 Elm St | Australia | CA    | Los Angeles |   90001 | 1234567890 |
