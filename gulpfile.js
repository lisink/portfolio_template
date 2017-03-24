'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

gulp.task('default', function () {
    console.log('test echo');
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../lisink.github.io/css'));
});


gulp.task('pug', function buildHTML() {
    return gulp.src('./src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('../lisink.github.io'));
});

gulp.task('build', ['sass', 'pug']);