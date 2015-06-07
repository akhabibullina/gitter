// Filename: router.js

// todo:
// 1. get data from ruby endpoint
// 2. create collections
// 3. require js?
// 4. add minified versions for js/lib
// 5. check & update the comments
// 6. cleanup Contents and View
// 7. HTML5 History

define([
  'jquery',
  'underscore',
  'backbone',
  'event-manager',
  'views/contents',
  'views/issue'
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
        // "Choose the issue"
      },

      viewDocument: function (title) {
        var selectedDocument = (documents).find(function (document) {
          return document.get('title') === title;
        });
        new IssueView({model: selectedDocument}).render().el;
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

    EventManager.on('document:selected', function(document) {
      var urlPath = 'view/' + document.get('title');
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


