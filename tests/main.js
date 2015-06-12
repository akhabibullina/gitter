// Filename: main.js1

// Require.js allows us to configure shortcut alias.
// There usage will become more apparent further along in the tutorial.
require.config({
  baseUrl: "../js",
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
    lib: '../lib',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    template: '../templates',
    localstorage: 'lib/backbone.localStorage',
    Squire: '../tests/lib/squire'
  }
});

require([
  // Load our app module and pass it to our definition function.
  '../tests/unit/views/base-view-unit',
  '../tests/unit/views/pagination-menu-unit',
  '../tests/unit/views/navigation-menu-unit',
  '../tests/unit/views/issue-list-unit',
  '../tests/unit/views/issue-list-item-unit',

  '../tests/unit/models/issue-details-unit',
  '../tests/unit/models/issue-unit',

  '../tests/unit/collections/issues-pageable-unit'
], function(){

});