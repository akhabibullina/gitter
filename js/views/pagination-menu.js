// Filename: views/pagination-menu

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function ($, _, Backbone, BaseView) {

  var paginationMenu;
  var PAGINATION_WRAPPER_SELECTOR = '#pagination';

  var initialize = function() {
    var PaginationMenu = BaseView.extend({

      events: {
        'click #prev': function () {
          this.ev.trigger('pagination:prev');
        },
        'click #more': function () {
          this.ev.trigger('pagination:next');
        }
      }

    });

    // The element is already in the page, simply select it.
    paginationMenu = new PaginationMenu({el: $(PAGINATION_WRAPPER_SELECTOR)});
  };

  // Singleton
  return {
    initialize: initialize,
    getInstance: function() { return paginationMenu }
  };
});