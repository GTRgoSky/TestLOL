const path = require('path') // 使用 NodeJS 自带的文件路径插件
const utils = require('./utils') //封装了一些方法的工具
const config = require('../config') //使用 config/index.js
const vueLoaderConfig = require('./vue-loader.conf') //使用vue-loader.conf
function resolve (dir) {
  return path.join(__dirname, '..', dir)  // 拼接我们的工作区路径为一个绝对路径
}
// eslint的规则
const createLintingRule = () => ({
  // 对.js和.vue结尾的文件进行eslint检查
  test: /.(js|vue)$/,
  // 使用eslint-loader
  loader: 'eslint-loader',
  // enforce的值可能是pre和post。其中pre有点和webpack@1中的preLoader配置含义相似。
  // post和v1中的postLoader配置含义相似。表示loader的调用时机
  // 这里表示在调用其他loader之前需要先调用这个规则进行代码风格的检查
  enforce: 'pre',
  // 需要进行eslint检查的文件的目录存在的地方
  include: [resolve('src'), resolve('test')],
  // eslint-loader配置过程中需要指定的选项
  options: {
    // 文件风格的检查的格式化程序，这里使用的是第三方的eslint-friendly-formatter
    formatter: require('eslint-friendly-formatter'),
    // 是否需要eslint输出警告信息
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
var webpack = require('webpack')
module.exports = {
  // webpack在寻找寻找相对路径的文件时候会以context作为根目录。
  // context默认为执行启动webpack时所在的当前工作目录
  context: path.resolve(__dirname, '../'),
   // entry表示入口，webpack构建的第一步从entry开始
   // 类型可以是string，object，array
  entry: {
    app: './src/main.js'
  },
  output: {
    // 输出文件存放的目录，必须是string类型的绝对目录
    path: config.build.assetsRoot,
    // 通过entry不同生成不同的文件名字，详情请看文章
    filename: '[name].js',
    // 发布到线上所有资源的url前缀，为string类型
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    // 导出库的名称，为string类型，不填写的时候，默认输出格式是匿名的立即执行函数
    // library: "KlivitamLibrary"
    // 导出库的类型，为枚举类型，默认是var
    // 可选值： umd umd2 commonjs2,commonjs,amd,this,var,assign,window,global,jsonp
    // libraryTarget: "jsonp"
    // 是否包含游泳的文件信息到生成的代码里
    // pathinfo: true
    // 附加chunk的文件名称
    // chunkFilename: "[id].js"
    // chunkFilename: "[chunkhash].js"
    // jsonp异步加载资源时的回调函数名
    // jsonpFunction: "webpackJsonP"
    // 生成source map文件的名称
    // sourceMapFilename: "[file].map"
    //浏览器开发者工具里显示的远吗模块名称
    // devtoolModuleFilenameTemplate: "webpack:///[resource-path]"
    // 异步加载跨域的资源时使用的方式
    // crossOriginLoading: "use-credentials",
    // crossOriginLoading: "anonymous",
    // crossOriginLoading: false,
  },
  // 配置模块解析时候的一些选项
  resolve: {
    // 自动补全的扩展名,能够使用户在引入模块时不带扩展
    extensions: ['.js', '.vue', '.json'],
    // 默认路径代理，例如 import Vue from 'vue$'，会自动到 'vue/dist/vue.esm.js'中寻找
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components': resolve('src/components'),
      // 可以在引入文件的时候使用pages符号引入src/pages文件夹中的文件
      'pages': resolve('src/pages'),
      'http': resolve('src/http'),
      'public': resolve('src/public'),
      'jquery': 'jquery'
    }
  },
  // 下面是针对具体的模块进行的具体的配置
  // 下面的配置语法采用的是version >= @2的版本
  module: {
    noParse: [/videojs-contrib-hls/], // 不用解析和处理的模块
    // rules是一个数组，其中的每一个元素都是一个对象，这个对象是针对具体类型的文件进行的配置。
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /.vue$/, // 正则匹配loader名字
        loader: 'vue-loader', // loader名字
        // 针对此加载器的具体配置
        // 针对前面的分析，这个配置对象中包含了各种css类型文件的配置，css source map的配置 以及一些transform的配置
        options: vueLoaderConfig
      },
      {
        test: /.js$/,
        // js文件的处理主要使用的是babel-loader。在这里没有指定具体的编译规则，babel-loader会自动
        // 读取根目录下面的.babelrc中的babel配置用于编译js文件
        loader: 'babel-loader',
        // 指定需要进行编译的文件的路径
        // 这里表示只对src和test文件夹中的文件进行编译
        include: [resolve('src'), resolve('test'), resolve('config/myapi')] //规则所包含的文件夹
      },
      {
        // 对图片资源进行编译的配置
        // 指定文件的类型
        test: /.(png|jpe?g|gif|svg)(?.*)?$/,
        // 使用url-loader进行文件资源的编译
        loader: 'url-loader',
        // url-loader的配置选项
        options: {
          // 文件的大小小于10000字节(10kb)的时候会返回一个dataUrl
          limit: 10000,
          // 生成的文件的保存路径和后缀名称
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      { // 对视频进行打包编译
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)(?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      { // 对字体进行打包编译
        test: /.(woff2?|eot|ttf|otf)(?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 这些选项用于配置polyfill或mock某些node.js全局变量和模块。
  // 这可以使最初为nodejs编写的代码可以在浏览器端运行
  node: {
    // 这个配置是一个对象，其中的每个属性都是nodejs全局变量或模块的名称
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    // 设置成empty则表示提供一个空对象
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}