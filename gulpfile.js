var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var paths = require('./gulp.config.json');
var uglify = require('gulp-uglify');

gulp.task('analisar', analisar);
gulp.task('compilar', compilar);
gulp.task('css', css);
gulp.task('default', padrao);
gulp.task('js', js);
gulp.task('limpar', limpar);

function analisar() {
	gulp.src([].concat(paths.js))
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
}

function compilar() {
	gulp.start('limpar');
	gulp.start('js');
	gulp.start('css');
}

function css() {
	return gulp.src([].concat(paths.css))
		.pipe(concat('all.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest(paths.build));
}

function js() {
	return gulp.src([].concat(paths.js))
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.build));
}

function limpar() {
	del([].concat(paths.build));
}

function padrao() {
	gulp.start('analisar');
	gulp.watch(paths.js, function (evt) {
		gulp.start('analisar');
		console.log("Arquivo alterado");
	});
}