// Filename: app.js
// todo: logging

define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
  'views/navigation-menu',
  'views/pagination-menu',
  'lib/log4javascript'
], function($, _, Backbone, Router, NavMenuView, PaginationMenuView, log4javascript){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
    NavMenuView.initialize();
    PaginationMenuView.initialize();
//    var log = log4javascript.getDefaultLogger();
//    log4javascript.info("Hello world");
  }

  return {
    initialize: initialize
  };
});