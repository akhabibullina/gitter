/**
 * Filename: app.js
 *
 * Initializes the modules and run the app.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
  'views/navigation-menu',
  'views/pagination-menu'
], function ($, _, Backbone, Router, NavMenuView, PaginationMenuView) {

  var initialize = function () {

    // Pass in our Router module and call it's initialize function
    Router.initialize();
    NavMenuView.initialize();
    PaginationMenuView.initialize();
  };

  return {
    initialize: initialize
  };

});