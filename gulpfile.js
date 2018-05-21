var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var del = require("del");
var csscomb = require('gulp-csscomb');
var cssconcat = require('gulp-concat-css');
var gutil = require("gulp-util");
var webpack = require("webpack");
var jsonServer = require("gulp-json-srv");

var path = {
    watch: {
        js: 'app/js/**/*.+(js|jsx)',
        less: 'app/less/*.less',
        html: 'app/**/*.html'
    },
    build: {
        js: 'build/js',
        css: 'build/css',
        fonts: 'build/fonts',
        html: 'build'
    },
    src: {
        less: 'app/less/*.less',
        css: 'app/css/*.css',
        libs: 'app/libs/**/*.css',
        html: 'app/*.html',
        fonts: 'app/fonts/**/*'
    }
};

var server = jsonServer.create();
gulp.task("JSONstart", function(){
    return gulp.src("db/db.json")
        .pipe(server.pipe());
});

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(require('./webpack.config.js'), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('less', function () {
    return gulp.src(path.src.less)
        .pipe(less())
        .pipe(gulp.dest('app/css'))
        // .pipe(browserSync.reload({stream: true}));
});

// gulp.task('browser-sync', function(){
//     browserSync({
//         server: {
//             baseDir: 'build'
//         },
//         notify: false
//     })
// });

gulp.task('clean', function() {
    return del.sync('build');
});

gulp.task('buildCss', function() {
    return gulp.src(path.src.css)
        .pipe(cssconcat('main.css'))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('watch', ['JSONstart','less', 'webpack'], function(){
    gulp.watch(path.watch.less, ['less', 'buildCss']);
    // gulp.watch(path.watch.html, [browserSync.reload]);
    gulp.watch(path.watch.js, ['webpack']);
});

gulp.task('build', ['JSONstart','clean', 'less', 'webpack'], function() {
    var buildCss = gulp.src(path.src.css)
        .pipe(cssconcat('main.css'))
        .pipe(gulp.dest(path.build.css));

    var buildCssLibs = gulp.src(path.src.libs)
        .pipe(cssconcat('lib.css'))
        .pipe(gulp.dest(path.build.css));

    var buildHtml = gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));

    var buildFonts = gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});