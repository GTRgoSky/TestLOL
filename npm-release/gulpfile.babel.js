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
var webpack = require('webpack-stream');
var babel = require('gulp-babel');
var babelify = require('babelify');


gulp.task('js', function () {
    gulp.src('src/*.js')
        .pipe(babel())
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
        .pipe(webpack({
            devtool: 'source-map',
            output: {
                filename: 'test.js'
            }
          }))
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: 'babel task complete'
        }));
})

gulp.task('browserify', function () {
    //https://github.com/chenbin92/ES6-with-gulp-build/blob/master/gulpfile.babel.js
        var b = browserify({
            //先处理依赖，入口文件
            entries: ['./test.js'],
            debug: true, // 告知Browserify在运行同时生成内联sourcemap用于调试
        })
        return b.bundle()
        .pipe(source('test.js'))
        .pipe(buffer()) // 缓存文件内容
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // 从 browserify 文件载入 map
        .pipe(sourcemaps.write('.')) // 写入 .map 文件
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: 'browserify task complete'
        }));
})

gulp.task('web', function () {
    gulp.src('./')
        .pipe(webserver({
            port: 8090, //端口
            host: '192.168.8.194', //域名
            liveload: true, //实时刷新代码。不用f5刷新
            directoryListing: {
                path: './index.html',
                enable: true
            }
        }))
});

gulp.task('watch', function() {
    var watcher = gulp.watch('src/*.js', ['js']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
})

gulp.task('w', ['js','watch'])

gulp.task('default', ['babel', 'web']);//测试用例

gulp.task('defaultT', ['browserify', 'web']);//待完善browserify