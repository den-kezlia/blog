var gulp = require('gulp');
var browserify = require('browserify');
var through2 = require('through2');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('browserify', function () {
    gulp.src('./react-src/main.js')
        .pipe(plumber())
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path, {'debug': true})
                .transform('reactify')
                .bundle(function(err, res) {
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

gulp.task('default', ['browserify']);

gulp.task('watch', function () {
    gulp.watch('react-src/**/*.*', ['default']);
});