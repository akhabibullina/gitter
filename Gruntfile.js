/**
 *  Project configuration.
 */
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
      },
      dist: {
        src: ['js/main.js', 'js/*.js', 'js/**/*.js'],
        dest: 'target/<%= pkg.name %>.js'
      }
    },

    jshint: {
      all: ['target/<%= pkg.name %>.js'],
      reporter: require('jshint-stylish')
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'target/<%= pkg.name %>.js',
        dest: '/<%= pkg.name %>.min.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};