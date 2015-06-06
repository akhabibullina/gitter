// Filename: views/contents
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
], function($, _, Backbone, BaseView){
  var eventAggregator = _.extend({}, Backbone.Events);
  var DocumentListView = BaseView.extend({
    tagName: 'li',
    events: {
      'click': function () {
        eventAggregator.trigger('document:selected', this.model);
      }
    },
    render: function () {
      this.$el.html(this.model.get('title'));
      return this;
    }
  });

// Our module now returns our view
  return DocumentListView;
});
