// Filename: router.js

define([
  'jquery',
  'underscore',
  'backbone',
  'event-manager',
  'views/contents',
  'views/issue-details'
], function ($, _, Backbone, EventManager, ContentsView, IssueView) {

  var initialize = function () {

    var DocumentRouter = Backbone.Router.extend({

      routes: {
        'contents': 'contents',
        'view': 'viewEmptyDocument',
        'view/:title': 'viewDocument',
        'feedback': 'leaveFeedback',
        // Default
        '*actions': 'defaultAction'
      },

      contents: function () {
        ContentsView.initialize();
      },

      viewEmptyDocument: function () {
        EventManager.trigger('navigate:empty-view');
      },

      viewDocument: function (number) {
        new IssueView({model: {'number': number}});
      },

      leaveFeedback: function () {
        EventManager.trigger('navigate:feedback');
        console.log('Navigate to Feedback Page');
        // todo: add form submit for some test email address :)
      },

      defaultAction: function () {
        // We have no matching route, lets just log what the Home URL was
        console.log('No route provided, fallback to default one.');
        router.navigate('contents', {trigger: true});
      }

    });

    var router = new DocumentRouter();
    Backbone.history.start();

    EventManager.on('document:selected', function (issue) {
      // Remember where we are
      var urlPath = 'view/' + issue.get('number');
      router.navigate(urlPath, {trigger: true});
    });

    EventManager.on('menu:changed', function (newAbsURL) {
      // Remember where we are
      var urlPath = newAbsURL.substring(1);
      router.navigate(urlPath, {trigger: true});
    });
  };

  // todo: add pagination events handlers here

  return {
    initialize: initialize
  };

});


