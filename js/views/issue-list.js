/**
 * Filename: views/contents
 *
 * Issue List View handles the list of issues on the page.
 *
 * Notes:
 *  - Uses Github API pagination
 *  - Backbone Localstorage for storing/fetching the data without
 *    performing the requests to the API or server. *
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'log',
  'views/base',
  'views/navigation-menu',
  'views/issue-list-item',
  'collections/issues-pageable',
  'localstorage'
], function ($, _, Backbone, Logger, BaseView, NavMenu, IssueListItemView, IssuesPageableCollection) {

  var
    CONTENTS_ID = '#contents',
    ARTICLE_SELECTOR = 'article',
    CONTENTS_SECTION_SELECTOR = '#contents section';

  var
    view,
    url,
    pageNumber = 1;

  // todo: this localStorage solution doesn't pay off, switch back to the server!

    function getPageableIssuesContent() {

      url = 'https://api.github.com/repos/rails/rails/issues?page=' + pageNumber + '&per_page=5';

      var view = this;

      if (localStorage.getItem("If-None-Match")) {

        // Check if the data has been modified
        $.ajax({
          url: url,
          type: 'head',
          statusCode: {
            // Success
            200: function (xhr) {
              displayIssues(xhr);
            }
          }
        });
      } else {
        displayNewResource();
      }
    };

    /*** HELPERS ***/

    function displayIssues(xhr) {
      if (isModified(xhr)) {
        displayNewResource();
      } else {
        displayCachedResource();
      }
    };

    function isModified(xhr) {
      if (xhr) {
        return localStorage['If-None-Match'] != getETagHeader(xhr);
      }
    };

    function getETagHeader(xhr) {
      var etag = xhr.getResponseHeader('ETag');
      if (etag) {
        return JSON.parse(etag.substring(2));
      }
    };

    function displayCachedResource() {
      var IssuesCollection = new IssuesPageableCollection({});
      IssuesCollection.fetch({
        success: function (issues) {
          view.collection = issues;
          view.render();
        },
        error: function () {
          Logger.out('Error occured while fetching the issues from LocalStorage');
        }
      })
    };

    function displayNewResource() {
      $.ajax({
        'url': url,
        'ifModified': true,
        success: function (data, code, xhr) {

          var etag = getETagHeader(xhr);
          etag &&(localStorage['If-None-Match'] = etag);

          var IssuesCollection = new IssuesPageableCollection(data);

          view.collection = IssuesCollection;
          view.render();

          IssuesCollection.each(function (model) {
            model.save();
          });
        },
        error: function () {
          Logger.out('Error occured while fetching the issues from Github API server');
        }
      })
    };

  var IssueListView = BaseView.extend({

    el: $(CONTENTS_SECTION_SELECTOR),

    initialize: function () {
      // quick'n'dirty solution
      // todo: replace locally global variable with a better way
      view = this;

      getPageableIssuesContent();

      this.ev.on('pagination:next', function () {
        getPageableIssuesContent(++pageNumber);
        //view.collection && view.collection.getNextPage();
        Logger.out('Fetching next page');
      });

      this.ev.on('pagination:prev', function () {
        pageNumber === 1? 1: pageNumber - 1;
        getPageableIssuesContent(pageNumber);
        //view.collection && view.collection.prevPage();
        Logger.out('Fetching prev page');
      });

      this.ev.on('document:selected, navigate:feedback', function () {
        // To avoid memory leaks destroy the old view
        view.remove();
      });

    },

    render: function () {

      // Show the current view
      $(ARTICLE_SELECTOR).hide();
      $(CONTENTS_ID).show();

      // Inform the menu animation about the view change
      var menuItem = $(NavMenu.MENU_ICONS.LIST);
      menuItem[0] && menuItem[0].dispatchEvent(new Event('click'));

      // Update the view
      var list = $('<ul></ul>');
      this.$el.html(list);

      // Update the view  and populate it with the data..
      if (view.collection && view.collection.models){
        (view.collection.models).forEach(function (document) {
          list.append(new IssueListItemView({model: document}).render().el);
        }, this);
      }

      // Call the parent
      IssueListItemView.__super__.render.apply(this, arguments);

      return this;
    }

  });

  return IssueListView;

});