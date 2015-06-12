/**
 * Filename: views/base
 *
 * Base View module for views where we keep the common
 * functionality all views should share.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'event-manager'
], function ($, _, Backbone, EventManager) {

  return Backbone.View.extend({

    // Use Event Object for pub-sub communication across models and views
    ev: EventManager,

    render: function () {
      window.dispatchEvent(new Event('resize'));
      window.scroll(0, 0);

      return this;
    }
  });

});
