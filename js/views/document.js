// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function($, _, Backbone, BaseView){
  var DocumentView = BaseView.extend({
    render: function () {
      this.$el.append($('h1')).html(this.model.get('title'));
      this.$el.append($('p')).html(this.model.get('content'));
      return this;
    }
  });
// Our module now returns our view
return DocumentView;
});
