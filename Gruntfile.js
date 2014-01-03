module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      coverage: {
        src:['app/vendor/liger.js','app/vendor/page.js','app/assets/js/**/*.js'],
        options: {
          specs: 'spec/**/*.js',
          keepRunner: true,
          vendor: ['app/vendor/cordova.js'],
          helpers: ['spec/javascripts/support/*.js', 'spec/javascripts/helpers/*.js'],
          junit: { 
            path: 'reports/xml',
            consolidate: true
          },
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'reports/coverage/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: 'reports/coverage/html'
                }
              }, 
              {
                type: 'cobertura', 
                options: {
                  dir: 'reports/coverage/cobertura'
                }
              },
              {
                type: 'lcov', 
                options: {
                  dir: 'reports/coverage/lcov'
                }
              },
              {
                type: 'text-summary'
              }
            ],
            template: require('grunt-template-jasmine-requirejs'),
              templateOptions: {
                requireConfig: {
                  baseUrl: '.grunt/grunt-contrib-jasmine/app'
                }
              }
          }
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('default', ['jasmine']);

};
