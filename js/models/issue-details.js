// Filename: models/project
// todo: validate the model
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