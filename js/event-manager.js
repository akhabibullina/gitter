/**
 * Filename: event-manager.js
 *
 * Creates a Common Event Object which will be used for
 * sub-pub model to communicate between modules.
 */

define([
  'jquery',
  'underscore',
  'backbone'
  ], function ($, _, Backbone) {

  return _.extend({}, Backbone.Events);

});
