// Filename: collections/issues-pageable

// todo: escape to prevent js attack
// todo: reset bootstrapped data
define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/issue',
  'lib/backbone.paginator'
], function(_, Backbone, IssueModel){

  var IssuesPageableCollection = Backbone.PageableCollection.extend({
    model: IssueModel,
    url: 'https://api.github.com/repos/rails/rails/issues'
  }, {
    mode: 'client',
    success: function (data) {
//    ev.trigger('itemList:reset');
  },
  error: function(e) {
    console.log('Error occured while pagination: ' + e);
  }});

  return IssuesPageableCollection;
});