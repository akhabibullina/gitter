// Filename: collections/issues-pageable

// todo: escape to prevent js attack
// todo: reset bootstrapped data
define([
  'underscore',
  'backbone',
  'lib/backbone.localStorage',
  // Pull in the Model module from above
  'models/issue'
], function (_, Backbone, IssueModel) {

  var IssuesPageableCollection = Backbone.Collection.extend({
    initialize: function (attributes) {
      this.pageNumber = attributes.pageNumber;
    },
    model: IssueModel,
    localStorage: new Backbone.LocalStorage("IssuesPageableCollection"),
    url: function () {
      // todo: change per_page to 25!
      //return 'https://api.github.com/repos/rails/rails/issues?page=' + this.pageNumber + '&per_page=5';
      // todo: uncomment
      return 'https://api.github.com/repos/rails/rails/issues';
    }
  }
//    todo: remove leftover from paginator
//    {
//    success: function (data) {
////    ev.trigger('itemList:reset');
//    },
//    error: function (e) {
//      console.log('Error occured while pagination: ' + e);
//    }
//  }
  );

  return IssuesPageableCollection;
});