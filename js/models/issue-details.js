/**
 * Filename: models/project
 *
 * Represents a single item of the issues collection.
 * Extends issue model with 'url' property to be able
 * to fetch the issue data on demand.
 */

define([
  'underscore',
  'backbone',
  'models/issue'
], function (_, Backbone, IssueModel) {

  var IssueDetailsModel = IssueModel.extend({
    initialize: function (attributes) {
      this.number = attributes.number;
    },
    url: function () {
      return 'https://api.github.com/repos/rails/rails/issues/' + this.number;
    }
  });

  // Return the model for the module
  return IssueDetailsModel;
});