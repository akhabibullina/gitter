// Filename: models/project
// todo: change the defaults according to real data
define([
  'underscore',
  'backbone',
], function(_, Backbone){

  var IssueModel = Backbone.Model.extend({
    initialize: function(attributes, options) {
      this.number = attributes.number;
    },
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
    },
   'url': 'https://api.github.com/repos/rails/rails/issues/20469' + this.number
  });

  // Return the model for the module
  return IssueModel;
});