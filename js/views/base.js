// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
// Create a Common Event Object
  return Backbone.View.extend({ev: _.extend({}, Backbone.Events)});
});
