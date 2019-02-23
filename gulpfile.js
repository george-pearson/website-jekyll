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
var uglify       = require("gulp-uglify");
var isprod       = false;

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
    var options = {stdio: 'inherit'};
    if(isprod) {
        options.env = {JEKYLL_ENV: "production"};
    }
    return cp.spawn('jekyll.bat', ['build'], options).on('close', done);
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
 * Minify .js files.
 */
gulp.task("scripts", function() {
    return gulp.src('_scripts/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({extname:'.min.js'}))
        .pipe(gulp.dest("assets/scripts/"));
});

/**
 * Compile .scss files.
 */
gulp.task('sass', function () {
    if(isprod){
        return gulp.src('_scss/main.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
            .pipe(cssnano())
            .pipe(rename('main.min.css'))
            .pipe(gulp.dest('assets/css/'));
    }
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
 * Watch js files & minify, run Jekyll.
 * Watch html/md files, run Jekyll.
 */
gulp.task('watch', function () {
    gulp.watch('_scss/**/*.scss', gulp.series('sass', 'jekyll'));
    gulp.watch('_scripts/**/*.js', gulp.series('scripts', 'jekyll'));
    gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '_posts/**/*', 'about/*', 'photos/*'], gulp.series('jekyll'));
});

/**
 * Default task, running `gulp` will trigger.
 */
gulp.task('default', gulp.parallel(()=>{isprod=false;},'sass', 'scripts', 'jekyll', 'serve', 'watch'));

/**
 * Default task, running `gulp prod` will trigger.
 */
gulp.task('prod', gulp.parallel(()=>{isprod=true;},'sass', 'scripts', 'jekyll', 'serve', 'watch'));

/**
 * Deploy to GitHub Pages, running `gulp deploy` will trigger.
 */
gulp.task('deploy', gulp.series(()=>{isprod=true;},'sass', 'scripts', 'jekyll', 'ghPages'));