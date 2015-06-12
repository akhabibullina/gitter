/**
 * Filename: models/issue-unit
 *
 * Unit test for pageable issues model.
 */

require([
  'jquery',
  'underscore',
  'backbone',
  'models/issue'
], function ($, _, Backbone, IssueModel) {

  var issueModel, data;

  QUnit.module("Issue Model", {
    setup: function () {

      data = {
        number: 1,
        title: 'Hello My Friend',
        labels: [],
        state: 'Open',
        user: {'login': 'anonymous', 'html_url': '', 'avatar_url': ''},
        body: 'To Be Continued',
        teaser: 'Something 140char',
        comments: 0
      };

      // Init
      issueModel = new IssueModel(data);

    },
    teardown: function () {
      issueModel = null;
    }
  });

  test("[init] extends Backbone Model object with correct set of property values... ", function () {
    ok(issueModel instanceof Backbone.Model);
    deepEqual(issueModel.attributes, data);
  });

  // Skip to prevent the additional requests to Github API which can exceed the rate limit.
  QUnit.skip("[save] saves the correct set of values... ", function () {
    var expected = {
      number: 1,
      title: 'Hello Again My Friend',
      labels: [],
      state: 'Open',
      user: {'login': 'not-so-anonymous', 'html_url': '', 'avatar_url': ''},
      body: 'To Be Continued',
      teaser: 'Something 140char',
      comments: 0
    };
    issueModel.save(expected);
    deepEqual(issueModel.attributes, expected);
  });

});