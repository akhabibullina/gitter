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
        // todo: revert to 25
        pageSize: 5
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

      initialize: function () {

        this.ev.on('pagination:next', function () {
          new ContentsView({collection: IssuesCollection.getNextPage()}).render();
          console.log('fetching new page');
        });

      },

      render: function () {

        $('#contents section').html(this.el);
        (this.collection.models).forEach(function (document) {
          this.$el.append(new DocumentListView({model: document}).render().el);
        }, this);


        ContentsView.__super__.render.apply(this, arguments);

        return this;
      }

    });

  };

  return {
    initialize: initialize
  };

});