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

     var a = new IssueModel({number: this.model.number});
        a.fetch({
         success: function (data) {
           that.model = data.attributes;
           that.render();
         },
         error: function(e) {
           console.log('Unable to get the info for selected item.' + e);
           // todo: show 'wrong id' message
         }
       });
    },

    render: function () {
      // todo: move to contents
      $('#contents').hide();

      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(IssueDetailsTemplate)(this.model);
      // Append our compiled template to this Views "el"
      this.$el.append(compiledTemplate);

      $('#default-message').hide();
      $('#view').show();


      IssueView.__super__.render.apply(this, arguments);

      return this;
    }
  });

// Our module now returns our view
  return IssueView;

});
