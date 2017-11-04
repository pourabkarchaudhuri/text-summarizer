var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pump = require('pump');

gulp.task('imagemin', () =>
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
);

gulp.task('js', function (cb) {
  pump([
        gulp.src('js/src/*.js'),
        uglify(),
        gulp.dest('build/scripts')
    ],
    cb
  );
});

gulp.task('css', function(){
   gulp.src('style/*.css')
   .pipe(concat('animate.min.css'))
   .pipe(concat('bootstrap.min.css'))
   .pipe(concat('scrolling-nav.css'))
   .pipe(concat('style.css'))
   .pipe(minify())
   .pipe(gulp.dest('build/styles/'));
});

gulp.task('default',['js','css'],function(){
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('vendor/jquery'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('vendor/jquery-easing'))
})

// Default task
gulp.task('default', ['copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync'], function() {
  // Reloads the browser whenever HTML or CSS files change
  gulp.watch('css/*.css', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
});
