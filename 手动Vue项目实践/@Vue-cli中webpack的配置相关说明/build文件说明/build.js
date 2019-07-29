'use strict'
require('./check-versions')() // 检查npm和node的版本
process.env.NODE_ENV = 'production' // 设置环境变量NODE_ENV的值是production
const ora = require('ora') // 终端的spinner
const rm = require('rimraf') // node.js版本的rm -rf
const path = require('path') // 使用Node自带的文件路径工具
const chalk = require('chalk') // 引入显示终端颜色模块
// const opn = require('opn')   // 一个可以强制打开浏览器并跳转到指定url的插件
const webpack = require('webpack') // 使用webpack
const config = require('../config') // 加载config的配置
const webpackConfig = require('./webpack.prod.conf') // 引入webpack在production环境下的配置文件
const spinner = ora('building for production...')
spinner.start()
// 删除打包目标目录下的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    // 进行打包
    spinner.stop()
    if (err) throw err
    // 输出打包的状态
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '')
    // 如果打包出现错误
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.'))
      // 退出
      process.exit(1)
    }
    console.log(chalk.cyan('  Build complete.'))
    console.log(chalk.yellow("Tip: built files are meant to be served over an HTTP server.' +'  Opening index.html over file:// won't work."))
  })
})