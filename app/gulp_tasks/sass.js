var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');

var sass_options = {
    development: {
        errLogToConsole: true,
        outputStyle: 'expanded'
    },
    production: {
        errLogToConsole: true,
        outputStyle: 'compressed'
    }
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

function lintScssFiles() {
    return gulp.src('scss/**/*.scss')
      .pipe(sassLint({
        options: {
          formatter: 'stylish',
          'merge-default-rules': false
        },
        rules: {
          'no-ids': 2,
          'no-mergeable-selectors': 1,
          'border-zero': 2,
          'final-newline': 2,
          'indentation': 2
        }
      }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
}

function compileFrontStylesInProdEnvironment() {

    return gulp.src('scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sass_options.production).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./public'));

}

function compileFrontStylesInDevEnvironment() {

    return gulp.src('scss/styles.scss')
        .pipe(sass(sass_options.development).on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public/'));

}

module.exports = {
    dev: compileFrontStylesInDevEnvironment,
    lint: lintScssFiles,
    prod: compileFrontStylesInProdEnvironment,
};