var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var stylus = require('gulp-stylus');
var minifyCss = require('gulp-minify-css');
var bowerFiles = require('gulp-bower-files');
var es = require('event-stream');

var config = {
    scripts: {
        src: './src/scripts/main.js',
        dest: './assets/js'
    },
    assets: {
        src: ['./src/**/*.*', '!./src/styles/**/*.*', '!./src/scripts/**/*.*'],
        dest: './assets'
    },
    styles: {
        src: './src/styles/main.styl',
        dest: './assets/css'
    },
    clean: {
        dest: './assets'
    }
};

gulp.task('default', ['scripts', 'assets', 'styles'], function () {

});

gulp.task('scripts', ['clean'], function () {
    return gulp.src(config.scripts.src)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('assets', ['clean'], function () {
    return es.merge(gulp.src(config.assets.src), bowerFiles())
        .pipe(gulp.dest(config.assets.dest));
});

gulp.task('clean', [], function () {
    return gulp.src(config.clean.dest, {read: false})
        .pipe(clean());
});

gulp.task('styles', ['assets'], function () {
    return  gulp.src(config.styles.src)
        .pipe(stylus())
        .pipe(minifyCss())
        .pipe(gulp.dest(config.styles.dest));
});