/**
 * Filename: router.js
 *
 * Router handles the requests.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'log',
  'event-manager',
  'views/issue-list',
  'views/issue-details'
], function ($, _, Backbone, Logger, EventManager, IssueListView, IssueDetailsView) {

  var initialize = function () {

    var DocumentRouter = Backbone.Router.extend({

      routes: {
        'contents':   'contents',
        'view':       'viewEmptyDocument',
        'view/:title':'viewDocument',
        'feedback':   'leaveFeedback',
        // Default
        '*actions':   'defaultAction'
      },

      contents: function () {
        new IssueListView();
      },

      viewEmptyDocument: function () {
        new IssueDetailsView();
      },

      viewDocument: function (number) {
        new IssueDetailsView({model: {'number': number}});
      },

      leaveFeedback: function () {
        // todo: add form submit for some test email address :)
        EventManager.trigger('navigate:feedback');
      },

      defaultAction: function () {
        // We have no matching route, lets just log what the Home URL was
        Logger.out('No route provided, fallback to default one.');
        router.navigate('contents', {trigger: true});
      }

    });

    var router = new DocumentRouter();
    Backbone.history.start();

    // Log the user actions.
    router.on('route', function(route, params) {
      Logger.out('Navigate to page: ' + route);
    });

    /* Custom Event Handlers */

    EventManager.on('document:selected', function (issue) {
      var urlPath = 'view/' + issue.get('number');
      router.navigate(urlPath, {trigger: true});
    });

    EventManager.on('menu:changed', function (newAbsURL) {
      var urlPath = newAbsURL.substring(1);
      router.navigate(urlPath, {trigger: true});
    });
  };

  // todo: add pagination events handlers here

  return {
    initialize: initialize
  };

});


