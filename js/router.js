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
  'views/issue',
  'collections/issues'
], function($, _, Backbone, EventManager, ContentsView, IssueView, IssuesCollection){

  var initialize = function(){

    var documents = new IssuesCollection();
    documents.add({ title: "Ginger Kid"});
    documents.add({ title: "JavaScript Modules", content: 'why do we need modules? Organising JavaScript into modules makes it easier to reason about programs and makes it possible to test.'});
    documents.add({ title: "Module Systems",content: 'There are three competing module systems at the moment: CommonJS, AMD and ECMAscript Harmony modules'});

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
        $('#contents section').html(new ContentsView({collection: documents.models}).render().el);
      },

      viewEmptyDocument: function() {
        // "Choose the issue"
      },

      viewDocument: function (title) {
        var selectedDocument = _(documents.models).find(function (document) {
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


