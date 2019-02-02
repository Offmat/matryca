var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


function bundleAdminScriptsInDevMode() {
    console.log('Bundling admin scripts in development mode');

    return gulp.src([
        'js/admin/**/*.js'
    ])
        .pipe(concat('admin.js'))
        .pipe(gulp.dest('./public/'));
}

function bundleAdminScriptsInProdMode() {
    console.log('Bundling admin scripts in production mode');

    return gulp.src([
        'js/admin/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('admin.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/'));

}

function bundleFrontendScriptsInDevMode() {
    console.log('Bundling frontend scripts in development mode');

    return gulp.src([
        'js/src/**/*.js'
    ])
        .pipe(concat('application.js'))
        .pipe(gulp.dest('./public/'));
}

function bundleFrontendScriptsInProdMode() {
    console.log('Bundling frontend scripts in production mode');

    return gulp.src([
        'js/src/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('application.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/'));
}

function compileJavascriptsLibs(){
    console.log('Compiling JS libs');
    return gulp.src([
        'js/libs/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/'));

}

module.exports = {
    dev: {
        admin: bundleAdminScriptsInDevMode,
        frontend: bundleFrontendScriptsInDevMode
    },
    prod: {
        admin: bundleAdminScriptsInProdMode,
        frontend: bundleFrontendScriptsInProdMode
    },
    libraries: compileJavascriptsLibs
};
