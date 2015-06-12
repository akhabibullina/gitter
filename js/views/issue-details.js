// Filename: views/issue-details

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  // Using the Require.js text! plugin, we are loaded raw text which will be used as our views primary template
  // https://github.com/requirejs/text
  'text!../template/issue-details.html',
  'text!../template/comment.html',
  'models/issue-details'
], function ($, _, Backbone, BaseView, IssueDetailsTemplate, CommentTemplate, IssueDetailsModel) {

  var
    ARTICLE_SELECTOR = 'article',
    VIEW_ID = '#view',
    VIEWS_SECTION_SELECTOR = '#view section',
    DEFAULT_MSG_ID = '#default-message',
    ISSUE_DETAILS_ID = '#issue-details';

  //url = 'https://api.github.com/repos/rails/rails/issues/' + number;
  //
  //function getIssueDetailsContent(issueID) {
  //
  //  if (localStorage.getItem("If-None-Match")) {
  //
  //    // Check if the data has been modified
  //    $.ajax({
  //      url: url,
  //      type: 'head',
  //      statusCode: {
  //        // Success
  //        200: function (xhr) {
  //          displayIssues(xhr);
  //        }
  //      }
  //    });
  //  } else {
  //    displayNewResource();
  //  }
  //};


  /*** HELPERS ***/

  //function displayIssues(xhr) {
  //  if (isModified(xhr)) {
  //    displayNewResource();
  //  } else {
  //    displayCachedResource();
  //  }
  //};
  //
  //function isModified(xhr) {
  //  return localStorage["If-None-Match"] != getETagHeader(xhr.getResponseHeader("ETag"));
  //};
  //
  //function getETagHeader(ETagString) {
  //  return JSON.parse(ETagString.substring(2));
  //};
  //
  //function displayCachedResource() {
  //  var IssuesCollection = new IssuesPageableCollection({});
  //  IssuesCollection.fetch({
  //    success: function (issues) {
  //      new IssueListView({collection: issues}).render();
  //    },
  //    error: function () {
  //      console.log('Error occured while fetching the issues from LocalStorage');
  //    }
  //  })
  //};
  //
  //function displayNewResource() {
  //  $.ajax({
  //    'url': url,
  //    'ifModified': true,
  //    success: function (data, code, xhr) {
  //      localStorage["If-None-Match"] = getETagHeader(xhr.getResponseHeader("ETag"));
  //      var IssuesCollection = new IssuesPageableCollection(data);
  //      IssuesCollection.each(function (model) {
  //        model.save();
  //      });
  //      new IssueListView({collection: IssuesCollection}).render();
  //    },
  //    error: function () {
  //      console.log('Error occured while fetching the issues from Github API server');
  //    }
  //  })
  //};


  var IssueDetailsView = BaseView.extend({

    el: $(VIEWS_SECTION_SELECTOR),

    initialize: function () {

      var that = this;

      var IssueModelItem = new IssueDetailsModel({number: this.model.number});

      IssueModelItem.fetch({
        success: function (data) {
          that.model = data.attributes;

          if (that.model.comments > 0) {
            // fetch comments
            $.get(that.model.comments_url, function (data) {
              that.model.comments_list = data;
              that.render();
            })
          } else {
            that.render();
          }
        },
        error: function (e) {
          console.log('Unable to get the info for selected item.' + e);
          // todo: show 'wrong id' message
        }
      });

      this.ev.on('document:selected, navigate:feedback', function () {
        // To avoid memory leaks destroy the old view
        that.remove();
      });
    },

    render: function () {

      // Show the current view
      $(ARTICLE_SELECTOR).hide();
      $(VIEW_ID).show();
      $(DEFAULT_MSG_ID).hide();

      // Inform the menu animation about the view change
      // Using Underscore we can compile our template with data.
      var compiledTemplate = _.template(IssueDetailsTemplate)(this.model);
      // Append our compiled template to this Views "el".
      $(VIEWS_SECTION_SELECTOR).html(compiledTemplate);

      if (this.model.comments > 0) {
        // Show comments if any
        var subTemplate = _.template(CommentTemplate)({'comments_list': this.model.comments_list});
        // Append our compiled template to this Views "el".
        $(ISSUE_DETAILS_ID).append(subTemplate);
      }

      setTimeout(function () {
        IssueDetailsView.__super__.render.apply(this, arguments)
      }, 0);

      return this;
    }
  });

  // The module now returns the view.
  return IssueDetailsView;

});
