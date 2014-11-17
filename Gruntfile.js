module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      coverage: {
        src: ['app/vendor/ligerbridge.js', 'app/vendor/page.js', 'app/assets/js/**/*.js'],
        options: {
          display: 'short',
          summary: true,
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
            report: [{
              type: 'html',
              options: {
                dir: 'reports/coverage/html'
              }
            }, {
              type: 'cobertura',
              options: {
                dir: 'reports/coverage/cobertura'
              }
            }, {
              type: 'lcov',
              options: {
                dir: 'reports/coverage/lcov'
              }
            }, {
              type: 'text-summary'
            }],
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

    complexity: {
      generic: {
        src: ['app/assets/js/**/*.js', 'app/vendor/page.js', 'app/vendor/ligerbridge.js'],
        exclude: [],
        options: {
          breakOnErrors: true,
          //jsLintXML: 'report.xml',
          // checkstyleXML: 'checkstyle.xml',
          errorsOnly: false,
          cyclomatic: [3, 7, 12],
          halstead: [8, 13, 20],
          maintainability: 100,
          hideComplexFunctions: false,
          broadcast: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.registerTask('default', ['jasmine', 'complexity']);

};
