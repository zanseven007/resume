var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var babel       = require("gulp-babel");
var sourcemaps  = require("gulp-sourcemaps");
var browserSync = require('browser-sync').create();

// Launch the server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: '/demo'
    });
});

// Build js files
gulp.task('compressJS', function() {
    gulp.src(['src/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Watch files for changes & recompile
gulp.task('watch', function () {
    gulp.watch(['src/*.js'], ['compressJS']);
    gulp.watch('demo/*.html').on('change', browserSync.reload);
});

// compile the project, including move font, compress js and scss, also be used to test
gulp.task('release', ['compressJS']);

// Default task, running just `gulp` will move font, compress js and scss, launch server, watch files.
gulp.task('default', ['release', 'browser-sync', 'watch']);