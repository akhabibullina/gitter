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

  var IssueView = BaseView.extend({

    el: $('#div'),

    initialize: function() {

     var that = this;

     var IssueModelItem = new IssueDetailsModel({number: this.model.number});
      IssueModelItem.fetch({
         success: function (data) {
           that.model = data.attributes;

           if (that.model.comments > 0) {
             // fetch comments
             $.get(that.model.comments_url, function(data) {
               that.model.comments_list = data;
               that.render();
             })
           } else {
             that.render();
           }
         },
         error: function(e) {
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
      $('article').hide();
      $('#view').show();
      $('#default-message').hide();

      // Inform the menu animation about the view change
      // Using Underscore we can compile our template with data.
      var compiledTemplate = _.template(IssueDetailsTemplate)(this.model);
      // Append our compiled template to this Views "el".
      $('#view section').html(compiledTemplate);

      if (this.model.comments > 0) {
        // Show comments if any
        var subTemplate = _.template(CommentTemplate)({'comments_list': this.model.comments_list});
        // Append our compiled template to this Views "el".
        $('#issue-details').append(subTemplate);
      }

      setTimeout(function(){IssueView.__super__.render.apply(this, arguments)}, 0);

      return this;
    }
  });

  // The module now returns the view.
  return IssueView;

});
