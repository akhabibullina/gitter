/**
 * Filename: views/issue-list-unit
 *
 * Unit for test issue list view.
 *
 * Note: uses mocks via Squire.
 */

define(['Squire'], function (Squire) {

  var injector = new Squire();
  var builder = injector;
    // todo: apply the mock
    //.mock('collections/issues-pageable', 'mocks/collections/issue-pageable');

  builder.require([
    'jquery',
    'underscore',
    'backbone',
    'views/issue-list'
  ], function ($, _, Backbone, IssueListView) {

    var issueListView, el;

    QUnit.module("Issue List Backbone View", {
      setup: function () {
        el = $('#qunit-fixture');
        // todo: mock el and collection
        issueListView = new IssueListView({el: el, collection: {}});
      },
      teardown: function () {
        issueListView = null;
      }
    });

    test("[init] extends Backbone Object with 'ev' property that is equal to Events object in Backbone", function () {
      ok(issueListView instanceof Backbone.View, 'Inherits Backbone View Object');
      ok(issueListView.ev, '"ev" property exists');
      //deepEqual(issueListView.ev, Backbone.Events, '"ev" property is equal to Event Object');
    });

    test("[render] creates and adds the correct list element", function () {
      // todo: pass el as a parameter while new object creation!
      deepEqual(issueListView.render().el, el[0]);
    });

    QUnit.skip("interacts with Issue Model", function () {
      // todo
    });

  });

});