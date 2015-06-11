require([
  'jquery',
  'underscore',
  'backbone',
  'models/issue-details'
], function ($, _, Backbone, IssueDetailsModel) {

  var issueDetailsModel, data;

  QUnit.module("Issue Details Model", {
    setup: function () {

      data = {
        number: 1,
        title: 'Untitled',
        labels: [],
        state: 'N/A',
        user: {'login': 'anonymous', 'html_url': '', 'avatar_url': ''},
        summary: 'To Be Continued',
        teaser: 'Something 140char',
        comments: 0
      }

      var number = 1;

      // Init
      issueDetailsModel = new IssueDetailsModel({number: number});

    },
    teardown: function () {
      issueDetailsModel = null;
    }
  });

  test("[init] extends Backbone Model object with correct set of property values... ", function () {
    ok(issueDetailsModel instanceof Backbone.Model);
    deepEqual(issueDetailsModel.attributes, data);
  });

  QUnit.skip("[fetch] pulls the correct set of values... ", function (assert) {
    var done = assert.async();
    issueDetailsModel.fetch({
      success: function (data) {
        assert.ok(data);
        done();
      },
      error: function () {
        done();
      }
    });
  })

});