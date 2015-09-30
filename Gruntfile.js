'use strict';
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      src: ['app/js/**/*.js', '!app/js/**/*.spec.js'],
      options: {
        vendor: [
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-ui-router/release/angular-ui-router.js',
          'app/bower_components/angular-mocks/angular-mocks.js'
        ],
        specs: 'app/js/**/*.spec.js'
      }
    }
  });

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['test']);
};
