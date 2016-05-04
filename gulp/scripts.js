'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var webpack = require('webpack-stream');
var wp = require('webpack');

var $ = require('gulp-load-plugins')();


function webpackWrapper(watch, test, callback) {
  var envPlugin = new wp.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production") } });
  var webpackOptions = {
    resolve: {
      root: path.resolve('node_modules'),
      extensions: ['', '.ts', '.js'],
      alias: { pace: 'pace-progress/pkg/pace'}
    },
    watch: watch,
    module: {
      preLoaders: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'tslint-loader'
        }
      ],
      loaders: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loaders: ['ng-annotate', 'ts-loader']
        }, {
          test: /pace.js$/,
          loader: 'imports?define=>false,require=>false'
        }
      ],
      noParse: [/pace/]
    },
    output: { filename: 'index.module.js' },
    plugins: [envPlugin]
  };

  if(watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if(err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if(watch) {
      watch = false;
      callback();
    }
  };

  var sources = [ path.join(conf.paths.src, '/app/app.module.ts') ];
  if (test) {
    sources.push(path.join(conf.paths.src, '/app/**/*.spec.ts'));
  }

  return gulp.src(sources)
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function () {
  return webpackWrapper(false, false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
  return webpackWrapper(true, false, callback);
});

gulp.task('scripts:test', function () {
  return webpackWrapper(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function (callback) {
  return webpackWrapper(true, true, callback);
});
