// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'views/document-list'
], function($, _, Backbone, BaseView, DocumentListView){
  var ContentsView = BaseView.extend({
    tagName: 'ul',
    render: function () {
      _(this.collection).each(function (document) {
        this.$el.append(new DocumentListView({model: document}).render().el);
      }, this);

      return this;
    }
  });
  // Our module now returns our view
  return ContentsView;
});