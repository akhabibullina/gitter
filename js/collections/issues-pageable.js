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

  // You don't usually return a collection instantiated
  return IssuesPageableCollection;
});


//Boostrapping the data as suggested at Backbone docs:
//http://documentcloud.github.io/backbone/#FAQ-bootstrap
//todo: escape to prevent js attack