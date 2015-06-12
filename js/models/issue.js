/**
 * Filename: models/issue
 *
 * Represents a single item of the issues collection.
 */

define([
  'underscore',
  'backbone'
], function (_, Backbone) {

  var IssueModel = Backbone.Model.extend({
    defaults: {
      number: 0,
      title: 'Untitled',
      labels: [],
      state: 'N/A',
      user: {'login': 'anonymous', 'html_url': '', 'avatar_url': ''},
      body: 'To Be Continued',
      teaser: 'Something 140char',
      comments: 0
    }
  });

  // Return the model for the module
  return IssueModel;
});