'use strict';

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var globby = require('globby');
var through = require('through2');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');
var gulp = require('gulp');
const minify = require('gulp-minify');
var webserver = require('gulp-webserver');
var browserify = require('browserify');
const notify = require('gulp-notify')
var browserify = require('babelify');
var babel = require('gulp-babel');


gulp.task('js', function () {
    gulp.src('src/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
        }))
        .pipe(gulp.dest('use/'))
    return;
});

gulp.task('babel', () => {
    gulp.src('test.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: 'babel task complete'
        }));
})

gulp.task('browserify', function () {
    //https://github.com/chenbin92/ES6-with-gulp-build/blob/master/gulpfile.babel.js
    browserify({
            //先处理依赖，入口文件
            entries: ['test.js'],
            debug: true, // 告知Browserify在运行同时生成内联sourcemap用于调试
        })
        .transform("babelify", {
            presets: ["es2015"]
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer()) // 缓存文件内容
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // 从 browserify 文件载入 map
        .pipe(sourcemaps.write('.')) // 写入 .map 文件
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: 'browserify task complete'
        }));
})

gulp.task('web', function () {
    gulp.src('./')
        .pipe(webserver({
            port: 8090, //端口
            host: '192.168.8.120', //域名
            liveload: true, //实时刷新代码。不用f5刷新
            directoryListing: {
                path: './index.html',
                enable: true
            }
        }))
});

var watcher = gulp.watch('src/*.js', ['js', 'brow']);
watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('default', ['js', 'web']);

gulp.task('defaultT', ['babel','browserify']);