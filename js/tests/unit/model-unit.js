QUnit.module("Issue Backbone Model Tests");
QUnit.test("Can be instantiated with correct default values", function () {
  // Number of Assertions we Expect
  expect(3);

  // Instantiate Local Issue Backbone Model Object
  var issue = new Issue();

  // Default Attribute Value Assertions
  equal(issue.get("name"), "John Smith");
  equal(issue.get("email"), "example@domain.com");
  equal(issue.get("telephone"), "555-555-5555");
});