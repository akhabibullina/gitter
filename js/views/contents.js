// Filename: views/contents

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'views/navigation-menu',
  'views/issue-list-item',
  'collections/issues-pageable',
  'localstorage'
], function ($, _, Backbone, BaseView, NavigationMenu, IssueListView, IssuesPageableCollection) {

  var initialize = function () {

    var pageNumber = 1;

    function getPageableIssuesContent(pageNumber) {
      // todo: Boostrapping the data as suggested at Backbone docs: http://documentcloud.github.io/backbone/#FAQ-bootstrap

      // todo: cache request responses
      $.get('https://api.github.com/repos/rails/rails/issues', function(data){

        var IssuesCollection = new IssuesPageableCollection(data);

        IssuesCollection.each(function(model) {
          model.save();
        });

        var c = new ContentsView({collection: IssuesCollection}).render();

        //people.fetch({// view xhr network
        //  success: function () {
        //    JSON.stringify(people);
        //  }
        //});

        //IssuesCollection.fetch({
        //  ajaxSync: true,
        //  success: function (issues) {
        //    //IssuesCollection.save(issues);
        //    var c = new ContentsView({collection: issues}).render();
        //  },
        //  error: function () {
        //    console.log('Couldnt fetch collection.');
        //  }
        //});


        /*
         var Person = Backbone.Model.extend({}),
         People = Backbone.Collection.extend({
         model: Person,
         localStorage: new Backbone.LocalStorage("People")
         });

         var people = new People({}).fetch({
         success: function (issues) {
         JSON.stringify(people);
         },
         error: function () {
         console.log('Couldnt fetch collection.');
         }
         });
         */
      });

      //IssuesCollection.fetch({
      //  success: function (issues) {
      //    var c = new ContentsView({collection: issues}).render();
      //  },
      //  error: function () {
      //    console.log('Couldnt fetch collection.');
      //  }
      //});
    }

    getPageableIssuesContent(pageNumber);

    var ContentsView = BaseView.extend({

      tagName: 'ul',

      initialize: function () {

        var that = this;

        this.ev.on('pagination:next', function () {
          getPageableIssuesContent(++pageNumber);
          console.log('fetching next page');
        });

        // todo:
        this.ev.on('pagination:prev', function () {
          getPageableIssuesContent(--pageNumber);
          console.log('fetching prev page');
        });

        this.ev.on('document:selected, navigate:feedback', function () {
          // To avoid memory leaks destroy the old view
          that.remove();
        });

      },

      render: function () {

        // Show the current view
        $('article').hide();
        $('#contents').show();

        // Inform the menu animation about the view change
        var menuItem = $('.icon.fa-home');
        menuItem[0] && menuItem[0].dispatchEvent(new Event('click'));

        // Update the view
        $('#contents section').html(this.el);
        (this.collection.models).forEach(function (document) {
          this.$el.append(new IssueListView({model: document}).render().el);
        }, this);

        // Call the parent
        ContentsView.__super__.render.apply(this, arguments);

        return this;
      }

    });

  };

  return {
    initialize: initialize
  };

});