Feature: Self-explanatory, basic layout
  In order for the app to be most useful
  Its layout should be enough to have the user understand both:
  - its core feature (currency conversion)
  - its usage (picking a currency & setting an amount on either column).

  Scenario: User is presented with a default layout
    Given I just loaded the app
    Then I should see two currency columns
    Then the "quote" currency column should be "EUR"
    Then the "counter" currency should be "USD"
    Then the amounts should be empty

  Scenario: User enters an amount which is immediately converted
    Given I just loaded the app
    When I enter a digit in the left currency widget's input
    Then the matching conversion should be displayed in the right widget's input
