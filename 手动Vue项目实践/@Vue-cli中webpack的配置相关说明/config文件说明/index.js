'use strict' // 严格模式
// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.
const config = require('./config') // 导入config文件
const path = require('path') //使用Node自带的文件路径插件
module.exports = {
  // 开发环境
  dev: {
    // Paths
    assetsSubDirectory: 'static', // 编译输出的二级目录 '除了 index.html 之外的静态资源要存放的路径，'
    assetsPublicPath: '/', // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名 代表打包后，index.html里面引用资源的的相对地址
    proxyTable: {
		'/api':{//对应接口请求以下配置，表示请求/api接口时访问的是 xxx.com/api地址
			target: 'xxx.com',//目标服务器地址
			changeOrigin: true
		}
    }, // 需要 proxyTable 代理的接口（可跨域），详情请看之前的文章

    // Various Dev Server settings
    host: '0.0.0.0', // host，如果设置成0.0.0.0可以通过统一局域网其他设备通过ip访问该网页
    port: 8080, // 网页默认端口号，如果端口被占用会自动分配一个随即未被占有的端口
    autoOpenBrowser: false, // 是否自动打开浏览器
    errorOverlay: true, //  在浏览器是否展示错误蒙层
    notifyOnErrors: true, // 是否展示错误的通知
    // 这个是webpack-dev-servr的watchOptions的一个选项，指定webpack检查文件的方式
    // 因为webpack使用文件系统去获取文件改变的通知。在有些情况下，这个可能不起作用。例如，当使用NFC的时候，
    // vagrant也会在这方面存在很多问题，在这些情况下，使用poll选项（以轮询的方式去检查文件是否改变）可以设定为true
    // 或者具体的数值，指定文件查询的具体周期。
    poll: false,

    // Use Eslint Loader?
    useEslint: true,//  eslint代码检查
    showEslintErrorsInOverlay: false,  // 如果设置为true，在浏览器中，eslint的错误和警告会以蒙层的方式展现。

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map', // 调试工具
    cacheBusting: true,  // 指定是否通过在文件名称后面添加一个查询字符串来创建source map的缓存
    cssSourceMap: false,  // 是否开启 cssSourceMap
  },

  // 正式环境
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'), // 编译注入的 index.html 文件,必须是本地的绝对路径

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),  // 编译输出的静态资源根路径
    assetsSubDirectory: 'static', // 编译输出的二级目录
    assetsPublicPath: config.getOutPutPath(), // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名

    // assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,  //生成用于生产构建的源映射
    devtool: '#source-map', // 调试代码的模式，共有7种，这里是生成source-map文件

    productionGzip: false, // 是否开启 gzip
    productionGzipExtensions: ['js', 'css'], // 需要使用 gzip 压缩的文件扩展名

    // 一个实用工具,用于分析项目的依赖关系
    // 如果这个选项是true的话，那么则会在build后，会在浏览器中生成一份bundler报告
    bundleAnalyzerReport: process.env.npm_config_report
  }
}