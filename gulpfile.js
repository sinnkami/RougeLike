const gulp = require('gulp');
const server = require('gulp-express');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('server', function () {
  server.run(['bin/www']);
});

gulp.task('server:watch', ['server'], function () {
  gulp.watch(['public/**/*'], ['server']);
})

gulp.task('default', [
  'sass:watch',
  'server:watch'
]);
