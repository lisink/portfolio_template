'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var csscomb = require('gulp-csscomb');
var addSrc = require('gulp-add-src');
var merge = require('merge-stream');
var cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin');

var gls = require('gulp-live-server');

gulp.task('default', function () {
    console.log('test echo');
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../lisink.github.io/css'));
});

gulp.task('csscomb', function () {
  return gulp.src(['./src/scss/**/*.scss', '!src/scss/_*.scss'])
    .pipe(csscomb())
    .pipe(gulp.dest('./src/scss/'));
});

gulp.task('build_css', function () {
    var css = gulp.src(['./src/css/**/*.css', '!./src/css/reset.css'])
        .pipe(addSrc.prepend('./src/css/reset.css'))
        .pipe(addSrc.prepend('./src/css/google_fonts.css'))
        .pipe(sourcemaps.init());

    var scss = gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError));

    var mergedStream = merge(css, scss)
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../lisink.github.io/css'));

    return mergedStream;
});

gulp.task('clean_css', function () {
    return  gulp.src('../lisink.github.io/css/styles.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cleanCSS({
                specialComments: false,
            }))
            .pipe(gulp.dest('../lisink.github.io/css'));
});

gulp.task('build_html', function buildHTML() {
    return gulp.src('./src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('../lisink.github.io'));
});

gulp.task('build_html_prod', function buildHTML() {
    return gulp.src('./src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('../lisink.github.io'));
});


gulp.task('serve', function() {
    var server = gls.static(['../lisink.github.io']);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['../lisink.github.io/css/styles.css', '../lisink.github.io/**/*.html'], function (file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('watch', function() {
    var watcher1 = gulp.watch('./src/**/*.pug', ['build_html']);
    var watcher2 = gulp.watch('./src/scss/**/*.scss', ['build_css']);

    watcher1.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    watcher2.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('imagemin', () =>
    gulp.src('../lisink.github.io/i/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../lisink.github.io/i/min'))
);

gulp.task('build', ['build_html', 'build_css']);
gulp.task('build_prod', ['build_html_prod', 'clean_css']);
gulp.task('server', ['serve', 'watch']);
