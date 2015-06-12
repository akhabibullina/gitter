/**
 * Filename: views/pagination-menu-unit
 *
 * Unit for test navigation view.
 */

require([
  'jquery',
  'underscore',
  'backbone',
  'views/pagination-menu'
], function ($, _, Backbone, PaginationMenuView) {

  var paginationMenuView, paginationContainer, nextButton, prevButton;

  QUnit.module("Pagination View", {
    setup: function () {

      // Fixture
      var fixture = $('#qunit-fixture');

      paginationContainer = $('<div>').attr('id', 'pagination');
      nextButton = $('<div>').attr('id', 'next');
      prevButton = $('<div>').attr('id', 'prev');

      // Create and add the buttons into the view
      fixture.append(paginationContainer);
      paginationContainer.append(nextButton);
      paginationContainer.append(prevButton);

      // Init
      PaginationMenuView.initialize();
      paginationMenuView = PaginationMenuView.getInstance();

    },
    teardown: function () {
      paginationMenuView = null;
    }
  });

  test("[init] extends Backbone View object with correct 'el' property value... ", function () {
    ok(paginationMenuView instanceof Backbone.View, 'Inherits Backbone View Object');
    ok(paginationMenuView.el);
    deepEqual(paginationMenuView.el, paginationContainer[0]);
  });

  QUnit.skip("[events] triggers pagination:next event when Next button is pressed... ", function () {

    // Make sure we don't miss the failure

    // todo
    //expect(1);

    // Prepare event handler
    paginationMenuView.ev.on('pagination:next', function (e) {
      ok(e);
    });

    // Generate click
    nextButton.click();
  });

  QUnit.skip("[events] triggers pagination:prev event when Prev button is pressed... ", function () {

    // Make sure we don't miss the failure

    // todo
    //expect(1);

    // Prepare event handler
    paginationMenuView.ev.on('pagination:prev', function (e) {
      ok(e);
    });

    // Generate click
    prevButton[0].dispatchEvent(new Event('click'));
  });

});