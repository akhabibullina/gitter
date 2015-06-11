// Filename: collections/issues-pageable

// todo: escape to prevent js attack
// todo: reset bootstrapped data
define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/issue',
  'localstorage'
], function (_, Backbone, IssueModel) {

  var IssuesPageableCollection = Backbone.Collection.extend({
      initialize: function (attributes) {
        this.pageNumber = attributes.pageNumber || 1;
      },
      model: IssueModel,
      localStorage: Backbone.LocalStorage ? new Backbone.LocalStorage("issues-page") : {},
      //url: function () {
      //  // todo: change per_page to 25!
      //  //return 'https://api.github.com/repos/rails/rails/issues?page=' + this.pageNumber + '&per_page=5';
      //  // todo: uncomment
      //  return 'https://api.github.com/repos/rails/rails/issues';
      //},
      nextPage: function () {
      },
      prevPage: function () {
      }
    }
  );

  return IssuesPageableCollection;
});