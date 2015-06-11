define(['Squire'], function (Squire) {

  var injector = new Squire();
  var builder = injector
    .mock('js/event-manager', {
      ev: {}
    });

  var issue;
// todo: review the names of the test
  builder.require([
    'jquery',
    'underscore',
    'backbone',
    'js/views/base'
  ], function ($, _, Backbone, BaseView) {

    var baseView;

    QUnit.module("Issue Backbone Base View", {
      setup: function (assert) {
        baseView = new BaseView();
      },
      teardown: function (assert) {
        baseView = null;
      }
    });

    test("Should contain 'ev' property that is equal to Events object in Backbone", function () {
      ok(baseView.ev, 'contains ev property');
      deepEqual(baseView.ev, Backbone.Events, "the test succeeds");
    });

    test("Should contain 'ev' property that is equal to Events object in Backbone", function () {
      ok(baseView.ev, 'contains ev property');
      deepEqual(baseView.ev, Backbone.Events, "the test succeeds");
    });


  });
});