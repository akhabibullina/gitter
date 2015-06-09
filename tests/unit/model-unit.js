var issue;

define([
  'jquery',
  '../../js/lib/underscore',
  '../../js/lib/backbone',
  '../../js/models/issue'
], function($, _, Backbone, IssueModel){

  QUnit.module("Issue Backbone Model Tests", {
    beforeEach: function( assert ) {
      issue = new IssueModel();
    }, afterEach: function( assert ) {
//    issue.
    }
  });

  QUnit.test("Can be instantiated with correct default values", function () {
    // Default Attribute Value Assertions
    equal(issue.get("name"), "John Smith");
    equal(issue.get("email"), "example@domain.com");
    equal(issue.get("telephone"), "555-555-5555");
  });

});