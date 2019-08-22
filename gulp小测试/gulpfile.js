var gulp = require('gulp');
// 获取 gulp-less 模块
var less = require('gulp-less');
//拼接参数
var minimist = require('minimist');
// 获取 minify-css 模块（用于压缩 CSS）
var minifyCSS = require('gulp-minify-css');
//热更
var connect = require('gulp-connect');

var knownOptions = {
  string: 'path',
  default: { env: process.env.NODE_ENV || 'production' }
};
//根据参数选择路径
var filePath = minimist(process.argv.slice(2), knownOptions).path;

//编译less
function gulpLess(){
    // 1. 找到 less 文件
    gulp.src(filePath + '/**.less')
    // 2. 编译为css
        .pipe(less())
    // 3. 压缩文件
        .pipe(minifyCSS())
    // 4. 另存文件
        .pipe(gulp.dest(filePath))
    // 5.实时刷新
        .pipe(connect.reload());
    console.log(filePath,'操作完成')
}

// 在命令行输入 gulp less 启动此任务
gulp.task('less',gulpLess);

//自动编译计划
gulp.task('auto',function(){
    connect.server({
        root: 'laodaixin',//入口地址
        livereload: true  //实时刷新
    });
    gulp.watch(filePath + '/**.less', ['less']);
})

gulp.task('default',['less']);

gulp.task('test', function() {
    console.log('test')
})