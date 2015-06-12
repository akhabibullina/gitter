/**
 * Filename: collections/issues-pageable
 *
 * Collection of issues.
 *
 * Notes:
 * - Backbone Localstorage for storing/fetching the data without
 * - Perform pagination using Github API
 */

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
      url: function () {
        //return 'https://api.github.com/repos/rails/rails/issues?page=' + this.pageNumber + '&per_page=5';
      },
      nextPage: function () {
        this.pageNumber = this.pageNumber + 1;

      },
      prevPage: function () {
        this.pageNumber = this.pageNumber = 0? 1: this.pageNumber - 1;
      }
    }
  );

  return IssuesPageableCollection;
});