#! /usr/bin/env node

//入口文件，通过注册实现  https://yj1438.github.io/技术笔记/2017/06/08/node_cli.html
console.log('This is a cli ~');
/*
 * process.argv:
 * 拼接参数时后面的参数模式 cli-demo -a -b --c /d
 [ 'node/v6.10.3/bin/node',
  'node/v6.10.3/bin/cli-demo',
  '-a',
  '-b',
  '--c',
  '/d' ]
 */
console.log('This is a cli ~ process.argv：' + process.argv[2]);