var issue;
require([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function ($, _, Backbone, BaseView) {

  var baseView;

  QUnit.module("Issue Backbone Base View", {
    setup: function () {
      baseView = new BaseView();
    },
    teardown: function () {
      baseView = null;
    }
  });

  test("[init] extends Backbone Object with 'ev' property that is equal to Events object in Backbone", function () {
    ok(baseView instanceof Backbone.View, 'Inherits Backbone View Object');
    ok(baseView.ev, '"ev" property exists');
    deepEqual(baseView.ev, Backbone.Events, '"ev" property is equal to Event Object');
  });

});