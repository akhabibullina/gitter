//todo: escape to prevent js attack
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
      console.log('loaded: ' + data.length);
//    ev.trigger('itemList:reset');
  }});

  return IssuesPageableCollection;
});