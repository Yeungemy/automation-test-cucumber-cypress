@parentSuite("Gherkin_parent_suite")
@suite("Gherkin_suite")
@subSuite("Gherkin_sub_suite")
@epic("Behaviours_epic")
@story("Behaviours_story")
Feature: Gherkin Feature with Allure Integration

  I want Gherkin scenarios to be logged into Allure.

  Scenario: Allure Gherkin Suite Structure
    Given some precondition
    When I do some actions
    Then I get some result

  @owner("Oleksandr_Shevtsov")
  @severity("critical")
  @testID("42")
  @issue("ACT-123")
  @tms("TC-123")
  @link("Google", "https://google.com")
  @link("Example", "https://example.com/")
  @willBeTag
  Scenario: Allure Labels
    Given some precondition
    Then I am very happy

  Scenario Outline: Some Scenario with Examples
    When I sum <a> and <b>
    Then I want to see <result>
    Examples:
      | a | b  | result |
      | 3 | 1  | 4      |
      | 3 | 1  | 5      |
      | 3 | 2  | 5      |
      | 2 | -1 | 1      |

  Scenario Outline: Attach Links for Each Example Separately
    Given some precondition
    Then I am very happy
    Examples:
      | tms         | issue  |
      | TEST-CASE-1 | TASK-1 |
      | TEST-CASE-2 | TASK-2 |
