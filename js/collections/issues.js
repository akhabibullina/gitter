define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/issue'
], function(_, Backbone, IssueModel){
  var IssuesCollection = Backbone.Collection.extend({
    model: IssueModel
  });
  // You don't usually return a collection instantiated
  return IssuesCollection;
});