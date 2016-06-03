var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    nib = require('nib');
    uglify = require('gulp-uglify');
    var pump = require('pump');


gulp.task('bootstrap3-css', function () {
    gulp.src('node_modules/bootstrap3/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('app/css'));
});

gulp.task('bootstrap3-fonts', function () {
    gulp.src('node_modules/bootstrap3/fonts/*')
        .pipe(gulp.dest('app/fonts'));
});


// stylus
gulp.task('styl', function () {
    gulp.src('develop/stylus/main.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [nib()],
            compress: true
        }))
        .pipe(sourcemaps.write())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/css/'));
});

//scripts
gulp.task('scripts-compress', function (cb) {
    pump([
            gulp.src('develop/scripts/*.js'),
            uglify({
                compress: true
            }),
            gulp.dest('app/js')
        ],
        cb
    );
});


// html
gulp.task('html', function () {
    gulp.src('app/index.html')
        .pipe(connect.reload());
});

// watch
gulp.task('watch', function () {
    gulp.watch('develop/stylus/*.styl', ['styl']);
    gulp.watch('app/index.html', ['html']);
});

// default
gulp.task('default', ['webserver', 'bootstrap3-css', 'bootstrap3-fonts', 'styl', 'scripts-compress', 'html', 'watch']);


var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            root: 'app'
            //fallback: 'index.html'
        }));
});
