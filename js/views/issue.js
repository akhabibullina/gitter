// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  // Using the Require.js text! plugin, we are loaded raw text which will be used as our views primary template
  // https://github.com/requirejs/text
  'text!../template/issue-details.html'
], function ($, _, Backbone, BaseView, IssueDetailsTemplate) {

  var IssueView = BaseView.extend({

    el: $('#view section'),

    render: function () {
      // todo: move to contents
      $('#contents').hide();

      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(IssueDetailsTemplate)(this.model.attributes);
      // Append our compiled template to this Views "el"
      this.$el.append(compiledTemplate);

      $('#view').show();

      return this;
    }
  });

// Our module now returns our view
  return IssueView;

});
