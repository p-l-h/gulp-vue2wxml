
var gulp = require('gulp');
var vue2wxml = require('./index');

gulp.task('default', function() {
    var stream = gulp.src('test/**/*.vue')
        .pipe(vue2wxml())
        .pipe(gulp.dest('test_dist'));
    return stream;
});
