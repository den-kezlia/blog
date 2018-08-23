var gulp = require('gulp'),
    browserify = require('browserify'),
    through2 = require('through2'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass');

gulp.task('browserify', function () {
    gulp.src('./react-src/main.js')
        .pipe(plumber())
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path, { 'debug': true })
                .transform('reactify')
                .bundle(function (err, res) {
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(babel({
            only: [
                './react-src/main.js',
            ],
            compact: true
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'))
});

gulp.task('sass', function () {
    gulp.src('public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
    gulp.watch('react-src/**/*.*', ['browserify']);
    gulp.watch('public/scss/**/*.*', ['sass']);
});