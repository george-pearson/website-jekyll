var gulp         = require('gulp');
var cp           = require('child_process');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
sass.compiler    = require('node-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var cssnano      = require('gulp-cssnano');
var sourcemaps   = require('gulp-sourcemaps');
var plumber      = require('gulp-plumber');
var ghPages      = require('gulp-gh-pages');

/**
 * Deploy to gh-pages branch.
 */
gulp.task('ghPages', function() {
    return gulp.src("./_site/**/*")
    .pipe(plumber())
    .pipe(ghPages());
});

/**
 * Build the Jekyll site, html/md files compiled to _site.
 */
gulp.task('jekyll', function (done) {
    return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'}).on('close', done);
});

/**
 * Launch the server and watch for changes to _site content.
 */
gulp.task('serve', function() {
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
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('assets/css/'));
});

/**
 * Dev compile .scss files.
 */
gulp.task('dev:sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
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
 * Dev
 * Watch scss files & recompile, run Jekyll.
 * Watch html/md files, run Jekyll.
 */
gulp.task('dev:watch', function () {
    gulp.watch('_scss/**/*.scss', gulp.series('dev:sass', 'jekyll'));
    gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '_posts/**/*', 'about/*', 'photos/*'], gulp.series('jekyll'));
});



/**
 * Default task, running just `gulp` will trigger.
 */
gulp.task('default', gulp.parallel('sass', 'jekyll', 'watch', 'serve'));

/**
 * Dev task, running `gulp dev` will trigger.
 */
gulp.task('dev', gulp.parallel('dev:sass', 'jekyll', 'dev:watch', 'serve'));

/**
 * Deploy to GitHub Pages.
 */
gulp.task('deploy', gulp.series('jekyll', 'ghPages'));