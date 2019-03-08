/**
 * Created by WIngs on 2019.3.8.
 */
'use strict'
const chalk = require('chalk')

/*
* 环境列表，第一个环境为默认环境
* envName: 指明现在使用的环境
* dirName: 打包的路径，只在build的时候有用
* apiHostname: 这个环境下面的api 请求的域名
* assetHostname: 静态资源存放的域名，未指定则使用相对路径
* 这里会在执行Build时执行
* */
const ENV_LIST = [
  {
    envName: 'test',
    parmasName: 'http://test_apiHostname',
  },
  {
    envName: 'pro',
    parmasName: 'http://product_apiHostname',
  },
  {
    envName: 'qa',
    parmasName: 'http://product_apiHostname',
  }
]

const HOST_ENV = process.env.HOST_ENV
console.log('HOST_ENV:', HOST_ENV)
let HOST_CONF
if ( HOST_ENV === undefined ) {
  // 没有设置环境，则默认为第一个
  HOST_CONF = ENV_LIST[0]
  console.log(chalk.bgYellow('缺少参数，默认使用 host-conf.js 的 ENV_LIST的第一个参数'))
} else {
  for (let i = 0; i < ENV_LIST.length; i++) {
    if ( ENV_LIST[i].envName === HOST_ENV) {
      HOST_CONF = ENV_LIST[i]
      break
    }
  }
}
// 如果没有匹配，发出警告，使用第一个
if( HOST_CONF === undefined) {
  HOST_CONF = ENV_LIST[0]
  console.log(chalk.bgRed('参数错误，默认使用 host-conf.js 的 ENV_LIST的第一个参数'))
  console.log(chalk.red('参数错误，默认使用 host-conf.js 的 ENV_LIST的第一个参数'))
}
// 把apiHostname设置到 node 的环境中 方便客户端使用
process.env.HOST_NAME = HOST_CONF.parmasName

// log选中的变量
console.log(chalk.green('选中的参数为：'))
console.log(HOST_CONF)

module.exports.HOST_CONF = HOST_CONF
module.exports.ENV_LIST = ENV_LIST