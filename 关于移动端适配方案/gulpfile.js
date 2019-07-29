// https://www.cnblogs.com/axl234/p/8871794.html

var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
//https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
var pxtoviewport = require('postcss-px-to-viewport');//

//定义一个testLess任务（自定义任务名称）
gulp.task('vw', async function () {
  // var processors = [px2rem({remUnit: 75})];
  var processors = [
      pxtoviewport({
          viewportWidth: 750,//设计稿的视口宽度
          viewportUnit: 'vmin',//希望使用的视口单位
          minPixelValue:1,
          propList: ['*', '!font*']//将不转换font-size以及font-weight等属性
      })
  ];
  await gulp.src('less/*.less') //该任务针对的文件，你需要编译的文件
    .pipe(less()) //该任务调用的模块
    .pipe(postcss(processors))
    .pipe(gulp.dest('css')); //将会在css下生成index.css
});


gulp.task('watch',function(){
  gulp.watch('less/*.less', gulp.series('vw'))
  .on('change', function (event) {
      console.log('File ---' + event + '--- was running tasks...');
  });
})