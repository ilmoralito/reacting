var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var uncss = require('gulp-uncss');
var minify = require('gulp-minify-css');

var config = {
	jsx: {
		src: 'app/jsx/*.js',
		dist: 'app/scripts'
	}
};

gulp.task('clean', function(cb) {
	del([config.jsx.dist], cb);
});

gulp.task('styles', ['clean'], function() {
	return gulp.src('app/components/bootstrap/dist/css/bootstrap.min.css')
		.pipe(uncss({html: ['index.html']}))
		.pipe(minify())
		.pipe(gulp.dest('app/stylessheets'))
});

gulp.task('jsx', ['clean'], function() {
	return gulp.src(config.jsx.src)
		.pipe(react())
		.pipe(gulp.dest(config.jsx.dist))
		.pipe(concat('all.js'))
		.pipe(gulp.dest(config.jsx.dist))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(config.jsx.dist));
});

gulp.task('default', ['jsx', 'styles']);