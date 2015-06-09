// Filename: main.js1

// Require.js allows us to configure shortcut alias.
// There usage will become more apparent further along in the tutorial.
require.config({
  baseUrl: "../",
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
    lib: '../js/lib',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    template: '../templates'
  }
});

require([
  // Load our app module and pass it to our definition function.
  'tests/pp'
], function(pp){
  // The "app" dependency is passed in as "App".
  pp.initialize();
});