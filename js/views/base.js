// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'event-manager'
], function($, _, Backbone, EventManager){
  // Share Event object for pub-sub communication across models and views
  return Backbone.View.extend({

    ev: EventManager,

    render: function() {
      window.dispatchEvent(new Event('resize'));
      window.scroll(0, 0);
    }});
});
