'use strict';
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      src: ['app/js/**/*.js', '!app/js/**/*.spec.js'],
      options: {
        vendor: [
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-ui-router/release/angular-ui-router.js',
          'app/bower_components/angular-mocks/angular-mocks.js',
          'app/bower_components/bardjs/dist/bard.js'
        ],
        specs: 'app/js/**/*.spec.js'
      }
    },
    connect: {
      server: {
        options: {
          base: 'app',
          open: true,
          useAvailablePort: true
        }
      }
    }
  });

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('serve', ['connect:server', 'connect:server:keepalive']);
  grunt.registerTask('default', ['test']);
};
