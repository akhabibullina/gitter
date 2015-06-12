/**
 * Filename: views/issue-list-item-unit
 *
 * Unit for test issue list item view.
 */

require([
  'jquery',
  'underscore',
  'backbone',
  'views/issue-list-item'
], function ($, _, Backbone, IssueListItemView) {

  var issueListItemView, el;

  QUnit.module("Issue List Item Backbone View", {
    setup: function () {
      el = $('#qunit-fixture');
      // mock el and collection
      // todo: replace with /data providers
      issueListItemView = new IssueListItemView({
        el: el,
        model: {
          attributes: {
            number: 0,
            title: 'Untitled',
            labels: [],
            state: 'N/A',
            user: {'login': 'anonymous', 'html_url': '', 'avatar_url': ''},
            body: 'To Be Continued',
            teaser: 'Something 140char',
            comments: 0
          }
        }
      });
    },
    teardown: function () {
      issueListItemView = null;
    }
  });

  test("[init] extends Backbone Object with 'ev' property that is equal to Events object in Backbone", function () {
    ok(issueListItemView instanceof Backbone.View, 'Inherits Backbone View Object');
    ok(issueListItemView.ev, '"ev" property exists');
    //deepEqual(issueListView.ev, Backbone.Events, '"ev" property is equal to Event Object');
  });

  test("[render] creates and adds the correct list item element", function () {
    var resultElement = issueListItemView.render().el;
    deepEqual(resultElement, el[0]);
    ok($(resultElement).find('#issue-list'), 'template was compiled and added as a list item');
  });

});