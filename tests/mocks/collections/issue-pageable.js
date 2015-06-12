/**
 * Filename: mocks/collections/issue-pageable
 *
 * Provides fake issues data for the tests.
 */

define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  '../models/issue'
], function (_, Backbone, IssueModel) {

  var IssuesPageableCollection = Backbone.Collection.extend({
      initialize: function (attributes) {
        this.add(new IssueModel());
        this.add(new IssueModel());
        this.add(new IssueModel());
      },
      model: IssueModel
    }
  );

  return IssuesPageableCollection;
});
