/**
 * Filename: views/navigation-menu
 *
 * Navigation menu between pages:
 * - all issues
 * - issue details
 * - feedback
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function ($, _, Backbone, BaseView) {

  var navigationMenu,
      NAVIGATION_WRAPPER_SELECTOR = '#nav a',
      MENU_ICONS = {
        'LIST': '.icon.fa-home',
        'DETAILS': '.icon.fa-folder',
        'FEEDBACK': '.icon.fa-envelope'
      };

  var initialize = function () {

    var NavigationMenu = BaseView.extend({

      events: {
        'click': function (e) {
          this.activate(e);
        }

      },
      activate: function (e) {

        // Change nav link (if it exists).
        $('a').removeClass('active');
        $(e.target).addClass('active');

        this.ev.trigger('menu:changed', $(e.target).attr('href'));

      }
    });

    navigationMenu = new NavigationMenu({el: $(NAVIGATION_WRAPPER_SELECTOR)});

  };

  // Singleton
  return {
    initialize: initialize,
    getInstance: function () {
      return navigationMenu
    },
    MENU_ICONS: MENU_ICONS
  };

});