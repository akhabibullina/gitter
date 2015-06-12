/**
 * Filename: views/issue-list-item.js
 *
 * Handles a single item within the issues list.
 *
 * Notes:
 * - It uses text Backbone plugin that helps to load HTML templates.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'views/navigation-menu',
  // Using the Require.js text! plugin, we are loaded raw text which will be used as our views primary template
  // https://github.com/requirejs/text
  'text!../template/issue-list.html'
], function ($, _, Backbone, BaseView, NavMenu, IssueTeaserTemplate) {

  var IssueListItemView = BaseView.extend({

    tagName: 'li',

    events: {

      'click h4': function () {

        this.ev.trigger('document:selected', this.model);

        // Trigger the navigation menu active tab
        $(NavMenu.MENU_ICONS.DETAILS).attr('href', '#view/' + this.model.attributes.number).click();

      }
    },
    render: function () {

      // todo: stop on new word or a line
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
