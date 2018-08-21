(function() {

  const baseDir = __dirname + '/app/index.html';

  const gulp = require('gulp');
  const browserSync = require('browser-sync').create();
  const browserSyncSpa = require('browser-sync-middleware-spa');
  const sonar = require('gulp-sonar');
  const bump = require('gulp-bump');
  const packageJson = require('./package.json');
  const useref = require('gulp-useref');
  const gulpif = require('gulp-if');
  const uglify = require("gulp-uglify");
  const minifyCss = require('gulp-minify-css');
  const embedTemplates = require('gulp-angular-embed-templates');

  gulp.task('compress', function() {
    return gulp.src('app/index.html',{allowEmpty: true})
      .pipe(useref({
        transformPath: function(filePath) {
          return filePath.replace('app/app', 'app');
        }
      }))
      .pipe(gulpif('*.js', embedTemplates({
        basePath: __dirname + '/'
      })))
      // .pipe(gulpif('app/**/*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulp.dest('dist/label-maker-js'));
  });

  gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: '../',
        middleware: [
          browserSyncSpa(/^[^\.]+$/, baseDir),

          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
          }
        ]
      },
      startPath: 'label-maker-js/index'
    });

    gulp.watch([
      'app/**/*.html',
      'app/**/*.js',
      'app/**/*.css'
    ]).on('change', browserSync.reload);
  });

  gulp.task('upgrade-version', function(value) {
    gulp.src('./package.json')
      .pipe(bump({
        version: process.env.npm_config_value
      }))
      .pipe(gulp.dest('./'));
  });

  gulp.task('sonar', function() {
    var options = {
      sonar: {
        host: {
          url: process.env.npm_config_sonarUrl,
        },
        jdbc: {
          url: process.env.npm_config_sonarDatabaseUrl,
          username: process.env.npm_config_sonarDatabaseUsername,
          password: process.env.npm_config_sonarDatabasePassword
        },
        projectKey: 'sonar:label-maker-js',
        projectName: 'label-maker-js',
        projectVersion: packageJson.version,
        // comma-delimited string of source directories
        sources: 'app',
        language: 'js',
        sourceEncoding: 'UTF-8',
        exec: {
          maxBuffer: 1024 * 1024
        },
        javascript: {
          lcov: {
            reportPath: 'target/test-coverage/report-lcov/lcov.info'
          }
        }
      }
    };

    return gulp.src('thisFileDoesNotExist.js', {
        read: false
      })
      .pipe(sonar(options));
  });

}());
