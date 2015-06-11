// Filename: views/base

define([
  'jquery',
  'underscore',
  'backbone',
  'event-manager'
], function ($, _, Backbone, EventManager) {

  return Backbone.View.extend({

    // Share Event object for pub-sub communication across models and views
    ev: EventManager,

    render: function () {
      window.dispatchEvent(new Event('resize'));
      window.scroll(0, 0);

      return this;
    }
  });

});
