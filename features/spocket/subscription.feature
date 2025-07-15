@SmokeTest
Feature: Subscription Management

  Background:
    Given Navigate to the spocket application
    When I enter valid username "test.shadab21@getnada.com"
    And I enter valid password "Test@1234"
    And I click the login button

  @SubscriptionTest
  Scenario: Upgrade and downgrade the subscription plan
    When the user navigates to the subscription or pricing section
    And the user selects a higher plan and confirms the upgrade
    Then the subscription should be successfully upgraded

    When the user selects a lower plan and confirms the downgrade
    Then the subscription should be successfully downgraded
