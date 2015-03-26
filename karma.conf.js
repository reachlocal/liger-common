// Karma configuration
// Generated on Sun Oct 20 2013 07:28:56 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // allowed values are clover, cobertura, html, json, json-summary, lcov, lcovonly, none, teamcity, text, text-summary
    coverageReporter: {
      reporters: [{
        type: 'html'
      }, {
        type: 'text',
      }]
    },


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [{
        pattern: 'src/**/*.js',
        included: false
      }, {
        pattern: 'spec/**/*Spec.js',
        included: false
      },

      'spec/spec-main.js',
    ],


    // list of files to exclude
    exclude: [
      'src/main.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],

    preprocessors: {
      'src/*.js': 'coverage'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
