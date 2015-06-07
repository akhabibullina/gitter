// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'event-manager'
], function($, _, Backbone, EventManager){
  return Backbone.View.extend({ev: EventManager});
});
