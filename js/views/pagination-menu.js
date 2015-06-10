// Filename: views/pagination-menu

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function ($, _, Backbone, BaseView) {

  var initialize = function() {
    var PaginationMenu = BaseView.extend({

      el: $('#pagination'),

      events: {
        'click #prev': function () {
          this.ev.trigger('pagination:prev');
        },
        'click #more': function () {
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