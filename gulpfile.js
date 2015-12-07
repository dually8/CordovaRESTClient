var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var tslint = require('gulp-tslint');
var gulpIgnore = require('gulp-ignore');

var paths = {
  sass: ['./scss/**/*.scss'],
  ts: ['./www/app/**/*.ts'],
  tslint: ['./www/app/**/*.ts', '!./www/app/typings/**/*.d.ts']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('./www/css/'))
	.pipe(minifyCss({
	  keepSpecialComments: 0
	}))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest('./www/css/'))
	.on('end', done);
});

gulp.task('tsc', ['sass'], function () {
	sh.exec("tsc --target es5 --sourceMap --out ./www/js/app.js ./www/app/_app.ts");
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.ts, ['tsc']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
	.on('log', function(data) {
	  gutil.log('bower', gutil.colors.cyan(data.id), data.message);
	});
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
	console.log(
	  '  ' + gutil.colors.red('Git is not installed.'),
	  '\n  Git, the version control system, is required to download Ionic.',
	  '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
	  '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
	);
	process.exit(1);
  }
  done();
});

gulp.task('tslint', function() {
	// https://github.com/panuhorsmalahti/gulp-tslint#all-default-report-options
	var reportOptions = {
		emitError: false,
		reportLimit: 0,
		summarizeFailureOutput: true
	};

	return gulp.src(paths.tslint)
		.pipe(gulpIgnore.exclude('./www/app/typings/**/*.d.ts'))
		.pipe(tslint())
		.pipe(tslint.report('prose', reportOptions));
});

gulp.task('build-ios', ['tsc'], function() {
	sh.exec("ionic build ios");
});

gulp.task('build-android', ['tsc'], function() {
	sh.exec("ionic build android");
});

gulp.task('openXcode', ['build-ios'], function() {
	sh.exec("open ./platforms/ios/*.xcodeproj");
});

gulp.task('emulate-iPhone6', ['tsc'], function() {
	sh.exec("ionic emulate ios --target=\"iPhone-6\"");
});

gulp.task('emulate-iPad2', ['tsc'], function() {
	sh.exec("ionic emulate ios --target=\"iPad-2\"");
});

gulp.task('ios', ['tsc'], function() {
	sh.exec("ionic run ios --device");
});

gulp.task('android', ['tsc'], function() {
	sh.exec("adb devices");
	sh.exec("ionic run android");
});