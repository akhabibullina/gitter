// Filename: views/navigation-menu

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function ($, _, Backbone, BaseView) {

  var initialize = function() {

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

    new NavigationMenu({el: $('#nav a')});

  };

  return {
    initialize: initialize
  };

});