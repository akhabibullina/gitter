// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
  'views/navigation-menu'
], function($, _, Backbone, Router, NavMenuView){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
    NavMenuView.initialize();
  }

  return {
    initialize: initialize
  };
});