// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'views/navigation-menu',
  'views/issue-list-item',
  'collections/issues-pageable'
], function ($, _, Backbone, BaseView, NavigationMenu, DocumentListView, IssuesPageableCollection) {

  var initialize = function () {

    // Boostrapping the data as suggested at Backbone docs:
    // http://documentcloud.github.io/backbone/#FAQ-bootstrap
    var IssuesCollection = new IssuesPageableCollection([], {
      mode: "client",

      state: {
        firstPage: 0,
        currentPage: 0,
        pageSize: 25
      }
    });

    IssuesCollection.fetch({
      'success': function (issues) {
        new ContentsView({collection: issues}).render();
      },
      error: function () {
        console.log('couldnt fetch');
      }
    });

    var ContentsView = BaseView.extend({

      tagName: 'ul',

      events: {
        'click': function () {
          // todo: fetch next page
        }
      },

      render: function () {
        $('#contents section').html(this.el);
        (this.collection.models).forEach(function (document) {
          this.$el.append(new DocumentListView({model: document}).render().el);
        }, this);
      }
    });

    return this;
  };

  return {
    initialize: initialize
  };

});