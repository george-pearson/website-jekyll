var gulp         = require('gulp');
var cp           = require('child_process');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
sass.compiler    = require('node-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var cssnano      = require('gulp-cssnano');

/**
 * Build the Jekyll site, html/md files compiled to _site.
 */
gulp.task('jekyll', function (done) {
    return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'}).on('close', done);
});

/**
 * Launch the server and watch for changes to _site content.
 */
gulp.task('serve', () => {
    browserSync.init({
      files: ['_site'],
      port: 4000,
      server: {
        baseDir: '_site'
      }
    });
});

/**
 * Compile .scss files.
 */
gulp.task('sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('assets/css/'));
});

/**
 * Watch scss files & recompile, run Jekyll.
 * Watch html/md files, run Jekyll.
 */
gulp.task('watch', function () {
    gulp.watch('_scss/**/*.scss', gulp.series('sass', 'jekyll'));
    gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '_posts/**/*', 'about/*', 'photos/*'], gulp.series('jekyll'));
});



/**
 * Default task, running just `gulp` will trigger.
 */
gulp.task('default', gulp.parallel('jekyll', 'watch', 'serve'));