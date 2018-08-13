const gulp = require('gulp');
const eslint = require('eslint');

gulp.task('default', ['lint'], function() {
	gulp.watch('js/**/*.js', ['lint']);
});

gulp.task('lint', function() {
	return gulp.src(['js/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});
