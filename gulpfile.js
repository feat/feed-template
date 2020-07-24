var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("."))
        .pipe(browserSync.stream());
});



gulp.task('serve', gulp.parallel(
    'sass',
    function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("scss/*.scss", gulp.series('sass'));
    gulp.watch("*.html").on('change', browserSync.reload);
}));
