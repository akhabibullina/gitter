// Filename: views/navigation-menu

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function ($, _, Backbone, BaseView) {

  var navigationMenu;
  var NAVIGATION_WRAPPER_SELECTOR = '#nav';

  var initialize = function() {

    var NavigationMenu = BaseView.extend({

      events: {
        'click a': function (e) {
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

  return {
    initialize: initialize,
    getInstance: function() { return navigationMenu }
  };

});