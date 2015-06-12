// Filename: views/issue-list-item.js
// todo: take out the selectors to the sharing module
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  // Using the Require.js text! plugin, we are loaded raw text which will be used as our views primary template
  // https://github.com/requirejs/text
  'text!../template/issue-list.html'
], function ($, _, Backbone, BaseView, IssueTeaserTemplate) {

  var IssueListItemView = BaseView.extend({

    tagName: 'li',

    events: {

      'click h4': function () {

        this.ev.trigger('document:selected', this.model);

        // Trigger the navigation menu active tab
        // todo: take out to nav menu
        $('.icon.fa-folder').attr('href', '#view/' + this.model.attributes.number).click();

      }
    },
    render: function () {

      this.model.attributes.teaser = this.model.attributes.body.substring(0, 139);

      // Update the view
      var compiledTemplate = _.template(IssueTeaserTemplate)(this.model.attributes);
      this.$el.append(compiledTemplate);

      IssueListItemView.__super__.render.apply(this, arguments);

      return this;

    }
  });

  // The module now returns the view.
  return IssueListItemView;
});
