const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', () => {
    gulp
      .src('src/**/*.js')
      .pipe(babel({
        plugins: ['transform-react-jsx', 'transform-es2015-destructuring', 'transform-es2015-parameters'],
      }))
      .pipe(gulp.dest('dist'));
  });
});

gulp.task('default', ['watch']);
