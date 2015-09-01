var gulp      = require('gulp'),
  $           = require('gulp-load-plugins')({lazy:true}),
  browserSync = require('browser-sync'),
  browserify  = require('browserify'),
  babelify    = require('babelify'),
  clean       = require('del'),
  source      = require('vinyl-source-stream');

/**
 * Plain config object to hold various settings
 */
var config = {
  outputDir: './build'
}

/**
 * Utility tasks
 */
gulp.task('server', function(){
  browserSync({
    server:{
      baseDir: "./build"
    }
  })
});

gulp.task('clean', function(){
  clean(config.outputDir);
});

gulp.task('watch', function(){
  $.livereload.listen();
  gulp.watch('site/stylus/**/*', ['stylus']);
  gulp.watch(['**/*.jade', '*.jade'], ['html']);
  gulp.watch('site/scripts/**/*', ['js-modules']);
});

/**
 * FED tasks
 */
gulp.task('images', function(){
  //Disabled in the inital build. Put inside gulp build when needed.
  return gulp
    .src('./images/*')
    .pipe(gulp.dest(config.outputDir + '/img'))
});

gulp.task('stylus', function(){
  var nib  = require('nib'),
    jeet = require('jeet');

  return gulp
    .src('./site/styles/styles.styl')
    .pipe($.sourcemaps.init())
    .pipe($.stylus({
      use:      [nib(),jeet()],
      compress: true
    }))
    .pipe($.rename('styles.css'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.outputDir + '/css'))
    .pipe($.livereload())
});

gulp.task('js-modules', function(){
  browserify({
    entries:'./site/scripts/scripts.js',
    debug:true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('scripts.js'))
  .pipe(gulp.dest(config.outputDir + '/js'))
});

gulp.task('html', function(){
  return gulp
    .src(['./site/*.jade'])
    .pipe($.jade({pretty: false}))
    .pipe(gulp.dest(config.outputDir))
    .pipe($.livereload())
});

/**
 * Build/watch/deploy tasks
 */
gulp.task('default', ['clean'], function(){
  console.log('Building, watching and starting server...');
  gulp.start('html', 'stylus', 'js-modules', 'server', 'watch');
});
