// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'event-manager',
  'views/contents',
  'views/issue-details'
], function($, _, Backbone, EventManager, ContentsView, IssueView){

  var initialize = function() {

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

      viewEmptyDocument: function() {
        $('#issue-details').hide();
        $('#default-message').show();
      },

      viewDocument: function (number) {
        new IssueView({model: {'number': number}});
      },

      leaveFeedback: function() {
        // do nothing
      },

      defaultAction: function(actions){
        // We have no matching route, lets just log what the URL was
        console.log('No route:', actions);
      }
    });

    var router = new DocumentRouter();
    Backbone.history.start();

    EventManager.on('document:selected', function(issue) {
      var urlPath = 'view/' + issue.get('number');
      router.navigate(urlPath, {trigger: true});
    });

    EventManager.on('menu:changed', function(newAbsURL) {
      var urlPath = newAbsURL.substring(1);
      router.navigate(urlPath, {trigger: true});
    });

    router.navigate('contents', {trigger:true});
  };

  return {
    initialize: initialize
  };

});


