// Filename: views/contents

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'views/navigation-menu',
  'views/issue-list-item',
  'collections/issues-pageable'
], function ($, _, Backbone, BaseView, NavigationMenu, IssueListView, IssuesPageableCollection) {

  var initialize = function () {

    // Boostrapping the data as suggested at Backbone docs: http://documentcloud.github.io/backbone/#FAQ-bootstrap
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
        console.log('Couldnt fetch collection.');
      }
    });

    var ContentsView = BaseView.extend({

      tagName: 'ul',

      initialize: function () {

        var that = this;

        this.ev.on('pagination:next', function () {
          new ContentsView({collection: IssuesCollection.getNextPage()}).render();
          console.log('fetching new page');
        });

        this.ev.on('document:selected, navigate:feedback', function () {
          // To avoid memory leaks destroy the old view
          that.remove();
        });

      },

      render: function () {

        $('article').hide();
        $('#contents').show();

        $('.icon.fa-home')[0].dispatchEvent(new Event('click'));

        $('#contents section').html(this.el);
        (this.collection.models).forEach(function (document) {
          this.$el.append(new IssueListView({model: document}).render().el);
        }, this);

        // Call the parent
        ContentsView.__super__.render.apply(this, arguments);

        return this;
      }

    });

  };

  return {
    initialize: initialize
  };

});