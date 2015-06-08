// Filename: models/project
// todo: validate the model
define([
  'underscore',
  'backbone'
], function(_, Backbone){

  var IssueModel = Backbone.Model.extend({
    initialize: function(attributes) {
      this.number = attributes.number;
    },
    url: function(){
      return 'https://api.github.com/repos/rails/rails/issues/' + this.number;
    },
    defaults: {
      number: 0,
      title: 'Untitled',
      labels: [],
      state: 'N/A',
      user: {'login': 'anonymous', 'html_url': '', 'avatar_url': ''},
      summary: 'To Be Continued',
      teaser: 'Something 140char',
      comments: 0
    }
  });

  // Return the model for the module
  return IssueModel;
});