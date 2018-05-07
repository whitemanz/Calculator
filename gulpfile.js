'use strict';
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var options = {
    src: {
        autoprefixer: 'src/css/**/*.css',
        sass: './src/scss/*.scss',
    },
    dest: {
        autoprefixer: 'app/css',
        sass: './src/css',
    },
    sass: {
        outputStyle: 'expanded', // [nested|expanded|compact|compressed]
    },
    browserSync: {
        server: {
            baseDir: "app"
        },
        host: 'localhost',
        port: 9000,
        logPrefix: "Frontend_Devil"
    }
}

gulp.task('autoprefixer', function () {
    gulp.src(options.src.autoprefixer)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(options.dest.autoprefixer));
});

gulp.task('sass', function () {
    return gulp.src(options.src.sass)
        .pipe(sass(options.sass)
            .on('error', sass.logError))
        .pipe(gulp.dest(options.dest.sass));
        // .pipe(reload({stream: true}));
});

gulp.task('webserver', function () {
    browserSync(options.browserSync);
});

gulp.task('watch', ['autoprefixer'], function () {
    gulp.watch(options.src.sass, ['sass']);
    gulp.watch(options.src.autoprefixer, ['autoprefixer']);
});

gulp.task('default', ['watch', 'webserver']);

