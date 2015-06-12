/**
 * Filename: main.js
 *
 * Starting point.
 */

// Require.js allows us to configure shortcut alias.
// There usage will become more apparent further along in the tutorial.
require.config({
  baseUrl: "js",
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    localstorage: 'lib/backbone.localStorage',
    template: '../templates',
    tests: 'tests',
    log: 'log'
  },
  shim: {
//    'theme/skel': {
//      "deps": ["jquery"],
//      "exports": "Skel"
//    },
//    'theme/skel-viewport': {
//      "deps": ["jquery"],
//      "exports": "Skel-viewport"
//    },
//    'theme/util': {
//      "deps": ["jquery"],
//      "exports": 'Util'
//    },
//    'theme/main': {
//      "deps": ["jquery", 'theme/skel', ],
//      "exports": "Skel"
//    },
  }
});

require([
  // Load our app module and pass it to our definition function.
  'app'
], function(App){
  // The "app" dependency is passed in as "App".
  App.initialize();
});