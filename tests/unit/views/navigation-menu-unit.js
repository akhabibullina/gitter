/**
 * Filename: views/navigation-menu-unit
 *
 * Unit for test navigation view.
 */

require([
  'jquery',
  'underscore',
  'backbone',
  'views/navigation-menu'
], function ($, _, Backbone, NavigationMenuView) {

  var navigationMenuView, navigationContainer, navigationLink;

  QUnit.module("Navigation View", {
    setup: function () {

      // Fixture
      var fixture = $('#qunit-fixture');

      navigationContainer = $('<div>').attr('id', 'nav');
      navigationLink = $('<a>');

      // Create and add the buttons into the view
      fixture.append(navigationContainer);
      navigationContainer.append(navigationLink);

      // Init
      NavigationMenuView.initialize();
      navigationMenuView = NavigationMenuView.getInstance();

    },
    teardown: function () {
      navigationMenuView = null;
    }
  });

  test("[init] extends Backbone View Object with correct 'el' property value... ", function () {
    ok(navigationMenuView instanceof Backbone.View, 'Inherits Backbone View Object');
    ok(navigationMenuView.el);
    deepEqual(navigationMenuView.el, navigationLink[0]);
  });


});