// Filename: router.js

// todo:
// 1. get data from ruby endpoint
// 2. create collections
// 3. require js?
// 4. add minified versions for js/lib
// 5. check & update the comments

define([
  'jquery',
  'underscore',
  'backbone',
  'views/contents',
  'views/document'
], function($, _, Backbone, ContentsView, DocumentView){

  var initialize = function(){

    var documents = [
      new Backbone.Model({
        title: 'JavaScript Modules',
        content: 'why do we need modules? Organising JavaScript into modules makes it easier to reason about programs and makes it possible to test.'
      }),
      new Backbone.Model({
        title: 'Module Systems',
        content: 'There are three competing module systems at the moment: CommonJS, AMD and ECMAscript Harmony modules'
      })
    ];

    var eventAggregator = _.extend({}, Backbone.Events);

    var DocumentRouter = Backbone.Router.extend({
      routes: {
        'contents': 'contents',
        'view/:title': 'viewDocument',
        // Default
        '*actions': 'defaultAction'
      },

      contents: function () {
        $('#me section').html(new ContentsView({collection: documents}).render().el);
      },

      viewDocument: function (title) {
        var selectedDocument = _(documents).find(function (document) {
          return document.get('title') === title;
        });

        $('#me section').empty().append(new DocumentView({model: selectedDocument}).render().el);
      },

      defaultAction: function(actions){
        // We have no matching route, lets just log what the URL was
        console.log('No route:', actions);
      }
    });

    var router = new DocumentRouter();
    Backbone.history.start();

    eventAggregator.on('document:selected', function(document) {
      var urlPath = 'view/' + document.get('title');
      router.navigate(urlPath, {trigger: true});
    });

    router.navigate('contents', {trigger:true});
  };

  return {
    initialize: initialize
  };

});


