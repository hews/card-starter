var gulp     = require('gulp-help')(require('gulp'));
var scsslint = require('gulp-scss-lint');

var changed  = require('gulp-changed');
var rename   = require('gulp-rename');

var sass       = require('gulp-sass');
// var imagemin   = require('gulp-imagemin');
// var concat     = require('gulp-concat');
// var uglify     = require('gulp-uglify');
// var sourcemaps = require('gulp-sourcemaps');

var del = require('del');

var paths = {
  source:      'source/**/*',
  sourceHtml:  'source/*.html',
  sourceScss:  'source/scss/**/*.scss',
  sourceSvgs:  'source/images/**/*.svg',
  dist:        'dist',
  distCss:     'dist/css',
  distSvgs:    'dist/images/**/*',
  examples:    'examples',
  examplesCss: 'examples/css'
};

gulp.task('clean', function() {
  return del([paths.dist, paths.examples]);
});

gulp.task('lint', function() {
  return gulp.src(paths.sourceScss)
    .pipe(scsslint());
});

gulp.task('html', function () {
  gulp.src(paths.sourceHtml)
    .pipe(rename('index.html'))
    // .pipe(changes(paths.dist))
    .pipe(gulp.dest(paths.examples))
});
gulp.task('example', ['html']);

gulp.task('build-css', function () {
  gulp.src(paths.sourceScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.distCss))
    .pipe(gulp.dest(paths.examplesCss))
});
gulp.task('sass', ['lint', 'build-css']);

// gulp.task('scripts', ['clean'], function() {
//   // Minify and copy all JavaScript (except vendor scripts)
//   // with sourcemaps all the way down
//   return gulp.src(paths.scripts)
//     .pipe(sourcemaps.init())
//       .pipe(coffee())
//       .pipe(uglify())
//       .pipe(concat('all.min.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/js'));
// });

// Copy all static images
// gulp.task('images', ['clean'], function() {
//   return gulp.src(paths.images)
//     // Pass in options to the task
//     .pipe(imagemin({optimizationLevel: 5}))
//     .pipe(gulp.dest('build/img'));
// });

// Rerun the task when a file changes
// gulp.task('watch', function() {
//   gulp.watch(paths.scripts, ['scripts']);
//   gulp.watch(paths.images, ['images']);
// });

gulp.task('default', ['help']);

// gulp.task('watch')
