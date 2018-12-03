//多页面打包
const path = require('path')
const {
    AutoWebPlugin
} = require('web-webpack-plugin');

// 使用本文的主角 AutoWebPlugin，自动寻找 pages 目录下的所有目录，把每一个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin(
    path.resolve('./多页面打包测试/pages'), 
    {
        template: './assets/template.html', // HTML 模版文件所在的文件路径
        postEntrys: ['./assets/common.css','./assets/anima.css'],// 所有页面都依赖这份通用的 CSS 样式文件
        // 提取出所有页面公共的代码
        commonsChunk: {
            name: 'common',// 提取出公共代码 Chunk 的名称
        },
    }
);

// //修改webpack.base.conf.js代码
// // 获取html-webpack-plugin参数的方法
// var getHtmlConfig = function (name, chunks) {
//     return {
//         template: `./src/pages/${name}/index.html`,
//         filename: `${name}.html`,
//         // favicon: './favicon.ico',
//         // title: title,
//         inject: true,
//         hash: true, //开启hash  ?[hash]
//         chunks: chunks,//页面要引入的包
//         minify: process.env.NODE_ENV === "development" ? false : {
//             removeComments: true, //移除HTML中的注释
//             collapseWhitespace: true, //折叠空白区域 也就是压缩代码
//             removeAttributeQuotes: true, //去除属性引用
//         },
//     };
// };
// //配置页面
// const htmlArray = [{
//         _html: 'index',
//         title: '首页',
//         chunks: ['vendor', 'index']//页面用到的vendor模块
//     },
//     {
//         _html: 'login',
//         title: '登录',
//         chunks: ['login']
//     },
// ];
// //自动生成html模板
// htmlArray.forEach((element) => {
//     module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
// })


module.exports = {
    autoWebPlugin
}