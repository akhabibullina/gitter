/**
 * Filename: views/issue-details
 *
 * Issue Details view is responsible for a specific issue the user wants to see details for.
 *
 * Notes:
 *  - It uses text Backbone plugin that helps to load HTML templates.
 *  - Backbone Localstorage for storing/fetching the data without
 *    performing the requests to the API or server. *
 *
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'log',
  'views/base',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template: https://github.com/requirejs/text
  'text!../template/issue-details.html',
  'text!../template/comment.html',
  'models/issue-details'
], function ($, _, Backbone, Logger, BaseView, IssueDetailsTemplate, CommentTemplate, IssueDetailsModel) {

  var
    ARTICLE_SELECTOR = 'article',
    VIEW_ID = '#view',
    VIEWS_SECTION_SELECTOR = '#view section',
    DEFAULT_MSG_ID = '#default-message',
    ISSUE_DETAILS_ID = '#issue-details';

  var IssueDetailsView = BaseView.extend({

    el: $(VIEWS_SECTION_SELECTOR),

    initialize: function () {

      if (!this.model) {
        return;
      }

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
            });
          } else {
            that.render();
          }
        },
        error: function (e) {
          Logger.out('Unable to get the info for selected item.' + e);
          $(ISSUE_DETAILS_ID).append($('<div class="row"><div id="default-message" class="6u 12u$(mobile)">Oops, we were not able to find the issue for ID provided...</div></div>'));
        }
      });

      this.ev.on('document:selected, navigate:feedback', function () {
        // To avoid memory leaks destroy the old view
        // that.remove();
        $(ISSUE_DETAILS_ID).hide();
      });

    },

    render: function () {

      // Show the current view
      $(ARTICLE_SELECTOR).hide();
      $(VIEW_ID).show();

      if (!this.model) {
        // Show default message message
        $(ISSUE_DETAILS_ID).append($('<div class="row"><div id="default-message" class="6u 12u$(mobile)">Please selected the issue you want to see first.</div></div>'));
      }

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
