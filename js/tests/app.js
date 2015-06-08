define([
  'jquery',
  'underscore',
  'backbone',
  'tests/unit/test-unit',
  'tests/unit/model-unit',
  'tests/unit/view-unit',
  'tests/unit/router-unit',
], function($, _, Backbone, Test, ModelTest, ViewTest, RouterTest){

  var initialize = function(){
    console.log(Router);
    RouterTest.initialize();
    console.log(Router);
  };

  return {
    initialize: initialize
  };

});