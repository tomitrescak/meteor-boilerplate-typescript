// Karma configuration
// Generated on Fri Dec 12 2014 13:51:51 GMT+1100 (AEDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: "**/*.ts", watched: false, included: false, served: true},
      {pattern: "**/*.js.map", watched: false, included: false, served: true},
      'src/private/testing/underscore/underscore-min.js',
      'src/private/testing/meteor-stubs.js',
      'src/private/testing/hugo-stubs.js',
      'src/tests/**/custom-stubs.js',
      'src/js/lib/**/*.js',
      'src/js/models/**/*.js',
      'src/js/tests/jasmine/server/**/*Spec.js'
    ],

    // list of files to exclude
    exclude: [
      'packages/**'
    ],

    /////// Source maps

    preprocessors: {
      '**/*.js': ['sourcemap']
    },

    /////// Typescript

    //preprocessors: {
    //  '**/*.ts': ['typescript']
    //},
    //
    //typescriptPreprocessor: {
    //  // options passed to the typescript compiler
    //  options: {
    //    sourceMap: true, // (optional) Generates corresponding .map file.
    //    target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
    //    // module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd'
    //    // noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
    //    // noResolve: true, // (optional) Skip resolution and preprocessing.
    //    removeComments: true // (optional) Do not emit comments to output.
    //  },
    //  // extra typing definitions to pass to the compiler (globs allowed)
    //  typings: [
    //  ],
    //  // transforming the filenames
    //  transformPath: function (path) {
    //    return path.replace(/\.ts$/, '.js');
    //  }
    //},

    //////// Coverage


    //preprocessors: {
    //  'models/**/*.js': ['coverage']
    //},

      
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    //preprocessors: {
    //  '/**/*.es6': ['6to5'],
    //  '/**/*.jsx': ['6to5'],
    //  '/**/*.next.js': ['6to5']
    //},

    //'6to5Preprocessor': {
    //  options: {
    //    sourceMap: 'inline'
    //  },
    //  filename: function(file) {
    //    file.originalPath = file.originalPath.replace(/\.next.js/, '.es5.js');
    //    file.originalPath = file.originalPath.replace(/\.es6/, '.es5.js');
    //    return file.originalPath.replace(/\.jsx$/, '.es5.js');
    //  },
    //  sourceFileName: function(file) {
    //    return file.originalPath;
    //  }
    //},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//    reporters: ['progress', 'coverage'],
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
