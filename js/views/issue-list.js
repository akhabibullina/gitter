// Filename: views/contents

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'views/navigation-menu',
  'views/issue-list-item',
  'collections/issues-pageable',
  'localstorage'
], function ($, _, Backbone, BaseView, NavigationMenu, IssueListView, IssuesPageableCollection) {

  var
    CONTENTS_ID = '#contents',
    ARTICLE_SELECTOR = 'article',
    CONTENTS_SECTION_SELECTOR = '#contents section',
    HOME_ICON = '.icon.fa-home';

  var initialize = function () {

    var pageNumber = 1;
    var url = 'https://api.github.com/repos/rails/rails/issues';

    function getPageableIssuesContent(pageNumber) {

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
      return localStorage["If-None-Match"] != getETagHeader(xhr.getResponseHeader("ETag"));
    };

    function getETagHeader(ETagString) {
      return JSON.parse(ETagString.substring(2));
    };

    function displayCachedResource() {
      var IssuesCollection = new IssuesPageableCollection({});
      IssuesCollection.fetch({
        success: function (issues) {
          new IssueListView({collection: issues}).render();
        },
        error: function () {
          console.log('Error occured while fetching the issues from LocalStorage');
        }
      })
    };

    function displayNewResource() {
      $.ajax({
        'url': url,
        'ifModified': true,
        success: function (data, code, xhr) {
          localStorage["If-None-Match"] = getETagHeader(xhr.getResponseHeader("ETag"));
          var IssuesCollection = new IssuesPageableCollection(data);
          IssuesCollection.each(function (model) {
            model.save();
          });
          new IssueListView({collection: IssuesCollection}).render();
        },
        error: function () {
          console.log('Error occured while fetching the issues from Github API server');
        }
      })
    };

    getPageableIssuesContent(pageNumber);

  };

  var IssueListView = BaseView.extend({

    el: $(CONTENTS_SECTION_SELECTOR),

    initialize: function () {

      initialize();

      var that = this;

      this.ev.on('pagination:next', function () {
        getPageableIssuesContent(++pageNumber);
        console.log('Fetching next page');
      });

      // todo:
      this.ev.on('pagination:prev', function () {
        getPageableIssuesContent(--pageNumber);
        console.log('Fetching prev page');
      });

      this.ev.on('document:selected, navigate:feedback', function () {
        // To avoid memory leaks destroy the old view
        that.remove();
      });

    },

    render: function () {

      // Show the current view
      $(ARTICLE_SELECTOR).hide();
      $(CONTENTS_ID).show();

      // Inform the menu animation about the view change
      var menuItem = $(HOME_ICON);
      menuItem[0] && menuItem[0].dispatchEvent(new Event('click'));

      // Update the view
      var list = $('<ul></ul>');
      $(CONTENTS_SECTION_SELECTOR).html(list);
      (this.collection.models).forEach(function (document) {
        list.append(new IssueListView({model: document}).render().el);
      }, this);

      // Call the parent
      IssueListView.__super__.render.apply(this, arguments);

      return this;
    }

  });

  return IssueListView;

});