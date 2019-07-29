#!/usr/bin/env node

/**
 * 执行命令入口文件，并且定义了一个'init'命令，
 * 执行命令后会去commands 目录下寻找对应的init.js文件
 */
process.env.NODE_PATH = __dirname + '/../node_modules/'
const { resolve } = require('path')
const res = command => resolve(__dirname, '../commands/', command)
const program = require('commander')

program.version(require('../package').version )

program.usage('<command>')

program.command('init')
  .option('-f, --foo', 'enable some foo')
  .description('Generate a new project')
  .alias('i')
  .action(() => {
    require(res('init'))
  })

if(!program.args.length){
  program.help()
}
