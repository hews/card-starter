var gulp       = require('gulp-help')(require('gulp'));
var scsslint   = require('gulp-scss-lint');
var changed    = require('gulp-changed');
var rename     = require('gulp-rename');
var sass       = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var svgo       = require('imagemin-svgo');
var minifyCss  = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

var es  = require('event-stream');
var del = require('del');

var paths = {
  source:       'source/**/*',
  sourceHtml:   'source/*.html',
  sourceScss:   'source/scss/**/*.scss',
  sourceSvgs:   'source/images/**/*.svg',
  dist:         'dist',
  distCss:      'dist/css',
  distSvgs:     'dist/images/',
  examples:     'examples',
  examplesCss:  'examples/css',
  examplesSvgs: 'examples/images/',
};

gulp.task('clean', function() {
  return del([paths.dist, paths.examples]);
});

gulp.task('html', function () {
  return gulp.src(paths.sourceHtml)
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.examples));
});

gulp.task('lint-scss', function() {
  return gulp.src(paths.sourceScss)
    .pipe(scsslint())
    .pipe(scsslint.failReporter());
});
gulp.task('compile-scss', ['lint-scss'], function () {
  return gulp.src(paths.sourceScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.distCss))
    .pipe(gulp.dest(paths.examplesCss))
    .pipe(sourcemaps.init())
      .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(paths.distCss))
    .pipe(gulp.dest(paths.examplesCss));
});
gulp.task('sass', ['compile-scss']);

gulp.task('images', function() {
  var dist = gulp.src(paths.sourceSvgs)
    .pipe(changed(paths.distSvgs))
    .pipe(svgo({multipass: true})())
    .pipe(gulp.dest(paths.distSvgs));

  var examples = gulp.src(paths.sourceSvgs)
    .pipe(changed(paths.examplesSvgs))
    .pipe(svgo({multipass: true})())
    .pipe(gulp.dest(paths.examplesSvgs));

  return es.concat(dist, examples);
});

gulp.task('watch', function() {
  gulp.watch(paths.sourceHtml, {verbose: true}, ['html']);
  gulp.watch(paths.sourceScss, {verbose: true}, ['sass']);
  gulp.watch(paths.sourceSvgs, {verbose: true}, ['images']);
});
gulp.task('default', ['watch']);
