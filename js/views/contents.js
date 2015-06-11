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

  var initialize = function () {

    var
      ARTICLE_SELECTOR = 'article',
      SECTION_SELECTOR = 'section',
      CONTENTS_ID = '#contents',
      HOME_ICON = '.icon.fa-home';

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
          new ContentsView({collection: issues}).render();
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
          new ContentsView({collection: IssuesCollection}).render();
        },
        error: function () {
          console.log('Error occured while fetching the issues from Github API server');
        }
      })
    };

    getPageableIssuesContent(pageNumber);

    var ContentsView = BaseView.extend({

      tagName: 'ul',

      initialize: function () {

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
        $(CONTENTS_ID + ' ' + SECTION_SELECTOR).html(this.el);
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