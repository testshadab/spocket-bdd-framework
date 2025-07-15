Feature: Subscription Management

  Background:
    Given Navigate to the dropshiptool application
    When Enter the dropshiptool "test.shadab211@getnada.com" and pass "Test@1234"
    And I click the dropshiptool login button

  @DropshiptoolSubscriptionTest
  Scenario: Upgrade and downgrade the subscription plan
    When dropshiptool user navigates to the subscription or pricing section
    And dropshiptool user selects a higher plan and confirms the upgrade
    Then dropshiptool subscription should be successfully upgraded
    When dropshiptool user selects a lower plan and confirms the downgrade
    Then dropshiptool subscription should be successfully downgraded
