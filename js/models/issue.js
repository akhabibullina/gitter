// Filename: models/project
define([
  'underscore',
  'backbone'
], function(_, Backbone){

  var IssueModel = Backbone.Model.extend({
    defaults: {
      number: 0,
      title: 'Untitled',
      labels: '',
      state: 'N/A',
      username: 'anonymous',
      photo: '',
      summary: 'To Be Continued',
      teaser: 'Something 140char',
      comments: {}
    }
  });

  // Return the model for the module
  return IssueModel;
});