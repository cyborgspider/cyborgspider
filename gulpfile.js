var gulp      = require('gulp'),
  $           = require('gulp-load-plugins')({lazy:true}),
  browserSync = require('browser-sync'),
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
  gulp.watch('site/styles/**/*', ['stylus']);
  gulp.watch(['**/*.jade', '*.jade'], ['html']);
});

/**
 * FED tasks
 */
gulp.task('images', function(){
  //Disabled in the inital build. Put inside gulp build when needed.
  return gulp
    .src('./site/images/**/*')
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

//Fow now, JS is handled entirely by the webpack process. Thus making this
//task useless, but kept here for reference.
gulp.task('js-webpack', function(){
  return gulp
    .src('./site/scripts/')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(config.outputDir + '/js'))
    .pipe($.livereload())
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
gulp.task('default', function(){
  console.log('Building, watching and starting server...');
  gulp.start('html', 'stylus', 'images', 'server', 'watch');
});
gulp.task('build', ['clean'], function(){
  console.log('Please run webpack -p to build production JS.');
  gulp.start('html', 'stylus', 'images');
});
