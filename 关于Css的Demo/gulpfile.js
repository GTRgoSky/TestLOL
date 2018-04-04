//https://blog.csdn.net/oak160/article/details/53743171
var gulp = require('gulp'),
    rename = require('gulp-rename'), //重命名
    uglify = require('gulp-uglify'), //压缩整个js文件
    minifycss = require('gulp-minify-css'), //压缩css
    less = require('gulp-less'); //本地安装gulp-less所用到的地方

//压缩css
gulp.task('doless', function () {
    return gulp.src('src/less/*.less') //需要操作的文件
        .pipe(less()) //执行压缩
        .on('error', swallowError)
        .pipe(gulp.dest('dist/css')); //输出文件夹
});

//压缩js
gulp.task('dojs', function () {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .on('error', swallowError)
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch',function(){
    gulp.watch(['src/js/*.js'],["dojs"]).on('change',event=>{
        console.log(`running tasks:js`)
    });
        
    gulp.watch(['src/less/*.less'],["doless"]).on('change',event=>{
        console.log(`running tasks:less`)
    });;
})

gulp.task('dogulp', ["doless","dojs"]);
gulp.task('default', ["watch"]);
// gulp.task('default', function () {
//     gulp.run('minjs', 'mincss');
//     gulp.run('watch');
// });

function swallowError(error) {
    // If you want details of the error in the console
  console.error(error.toString())

  this.emit('end')
}