// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function ($, _, Backbone, BaseView) {

  var initialize = function() {
    var PaginationMenu = BaseView.extend({
      el: $('#more'),
      events: {
        'click': function () {
          this.ev.trigger('pagination:next');
        }
      }
    });

    new PaginationMenu();
  };

  return {
    initialize: initialize
  };
});