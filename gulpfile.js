var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var minifyJS = require('gulp-uglify');

gulp.task('css', function() {

    gulp.src([
        './node_modules/leaflet/dist/leaflet.css',
        './css/app.css'
    ])
    .pipe(concat('app.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'));

});

gulp.task('js', function() {

    gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/leaflet/dist/leaflet.js',
        './node_modules/leaflet-omnivore/leaflet-omnivore.min.js',
        './node_modules/mustache/mustache.min.js',
        './js/app.js'
    ])
    .pipe(concat('app.js'))
    .pipe(minifyJS())
    .pipe(gulp.dest('./public/js'));

});

gulp.task('default', ['css', 'js']);
