// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('scripts', function() {
  gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('styles', function() {
  gulp.src(['./src/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
});

gulp.task('watch', function() {
  // watch for HTML changes
  gulp.watch('./src/*.html', function() {
    gulp.run('htmlpage');
  });

  // watch for JS changes
  gulp.watch('./src/scripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  // watch for CSS changes
  gulp.watch('./src/styles/*.css', function() {
    gulp.run('styles');
  });
});