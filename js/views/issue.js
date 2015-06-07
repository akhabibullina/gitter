// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  // Using the Require.js text! plugin, we are loaded raw text which will be used as our views primary template
  // https://github.com/requirejs/text
  'text!../template/issue-details.html',
  'models/issue'
], function ($, _, Backbone, BaseView, IssueDetailsTemplate, IssueModel) {

  var IssueView = BaseView.extend({

    el: $('#view section'),

    initialize: function() {
      var that = this;
      new IssueModel({number: this.model.number})
        .fetch()
        .success(function(data) {
            that.model = data;
            that.render();
      });

    },

    render: function () {
      // todo: move to contents
      $('#contents').hide();

      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(IssueDetailsTemplate)(this.model);
      // Append our compiled template to this Views "el"
      this.$el.append(compiledTemplate);

      $('#view').show();

      return this;
    }
  });

// Our module now returns our view
  return IssueView;

});
