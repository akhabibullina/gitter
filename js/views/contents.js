// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'views/navigation-menu',
  'views/issue-list-item'
], function($, _, Backbone, BaseView, NavigationMenu, DocumentListView){
  var ContentsView = BaseView.extend({
    tagName: 'ul',
    render: function () {
      (this.collection).forEach(function (document) {
        this.$el.append(new DocumentListView({model: document}).render().el);
      }, this);

      return this;
    }
  });
  // Our module now returns our view
  return ContentsView;
});