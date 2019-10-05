var gulp = require('gulp');
// var webpack = require('webpack');
var notify = require('gulp-notify');
var webpack = require('webpack-stream');
var compiler = require('webpack');

var server = require('./server');
var config = require('../config');
var webpackConfig = require('../assets/webpack.config').createConfig;

function handler(err, stats, cb) {
  var errors = stats.compilation.errors;

  if (err) throw new gutil.PluginError('webpack', err);

  if (errors.length > 0) {
    notify.onError({
      title:   'Webpack Error',
      message: '<%= error.message %>',
      sound:   'Submarine'
    }).call(null, errors[0]);
  }

  server.reload();
  if (typeof cb === 'function') cb();
}

gulp.task('js', function (cb) {
  return gulp.src('src/app.js')
    .pipe(webpack(webpackConfig(config.env), compiler))
    .pipe(gulp.dest('build/js'));
  // webpack(webpackConfig(config.env)).run(function (err, stats) {
  //   handler(err, stats, cb);
  // });
});
