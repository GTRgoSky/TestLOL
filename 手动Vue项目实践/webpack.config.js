//http://webpack.wuhaolin.cn/2配置/2-8整体配置结构.html
const config = require('./config');

//https://segmentfault.com/q/1010000009642018/a-1020000009642094 关于打包的路径多出一个static
//https://www.mmxiaowu.com/article/58482558d4352863efb55475 关于vue不同情况下打包模式
module.exports = config.manyPage//config.singlePage
// module.exports = config.singlePage
// setTimeout(()=>{
//     upload(function(res,body){
//         console.log(body)
//     })
// },3000)

//1MB 146kb
//1MB 146KB
