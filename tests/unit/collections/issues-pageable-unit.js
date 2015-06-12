/**
 * Filename: collections/issue-pageable
 *
 * Unit test for pageable issues list collection.
 *
 * Note: uses mocks via Squire.
 */

define(['Squire'], function (Squire) {

  var injector = new Squire();
  var builder = injector
    .mock('localstorage', {});

  builder.require([
    'jquery',
    'underscore',
    'backbone',
    'collections/issues-pageable'
  ], function ($, _, Backbone, IssuePageableCollection) {

    var issuesPageable, data = undefined;

    QUnit.module("Issues Collection", {
      setup: function () {
        // Init
        issuesPageable = new IssuePageableCollection({});

      },
      teardown: function () {
        issuesPageable = null;
      }
    });

    test("[init] extends Backbone Collection object with correct set of property values... ", function () {
      ok(issuesPageable instanceof Backbone.Collection);
      deepEqual(issuesPageable.attributes, data);
    });

    // Skip to prevent the additional requests to Github API which can exceed the rate limit.
    QUnit.skip("[fetch] pulls the correct set of values... ", function (assert) {
      var done = assert.async();
      issuesPageable.fetch({
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

});