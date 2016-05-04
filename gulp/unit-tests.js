'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var karma = require('karma');

var pathSrcHtml = [
  path.join(conf.paths.tmp, '/serve/**/*.html'),
  path.join(conf.paths.src, '/**/*.html')
];

var pathSrcJs = [
  path.join(conf.paths.tmp, '/serve/app/index.module.js')
];

function runTests (singleRun, done) {
  var reporters = ['mocha'];
  var preprocessors = {};
  var mochaConfig = { output: 'minimal' };

  pathSrcHtml.forEach(function(path) {
    preprocessors[path] = ['ng-html2js'];
  });

  if (singleRun) {
    pathSrcJs.forEach(function(path) {
      preprocessors[path] = ['coverage'];
    });
    reporters.push('coverage')
  }

  var localConfig = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun,
    reporters: reporters,
    preprocessors: preprocessors,
    mochaReporter: mochaConfig

  };

  var server = new karma.Server(localConfig, function(failCount) {
    (function() { return done(failCount ? new Error("Failed " + failCount + " tests.") : null) })();
  });
  server.start();
}

gulp.task('test', ['scripts:test', 'markups'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], function(done) {
  runTests(false, done);
});
