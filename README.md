#### 截止 2018.03.28

height:100%与 height：inherit 的区别

module 的加载顺序（附带 node-babel）

window 属性监听

Spa 的服务端设置（history）

#### 截止 2018.05.31

Vue 双向绑定测试

vue-cli 测试

vue.use && 组件测试

node.js 读写文件，搭载测试服务器测试

#### 截止 2018.06.22

servei-worker 第一次接触，fetch 没找到效果

#### 截止 2018.07.19

测试通过第一次 cache 存储、PWA 的离线缓存功能。

完成 webpack+Node 打包后的自动化部署功能。

在手动 Vue 中的 ref 实验中添加了关于 Vue 性能的标记测试(performance[一个浏览器自带的性能检测器])

#### 截止 2018.08.26

新增自动部署服务器文件夹：测试流的传递。实现本地打包 zip 后传到服务端解压--部署--删除 zip 的自动化流程

在手动 Vue 项目实践中新增 vue-study 文件夹：Vue 策略 Demo \$options 的 Demo 关于 Vue 构造函数继承后的一些父子继承测试 关于源码中一些问题的校验

#### 截止 2018.09.14

计划做一套简单的 Node.js 命令行程序
新增 node_cli 文件夹：增加了通过 Node && shell 执行 Git 脚本，节省手动 git 的步骤（目前只实现了递交功能）

尽量理清楚 vue 双向绑定思路

关于 http 发送的事件顺序：
https://segmentfault.com/a/1190000012925872
浏览器进程包含：
GUI 渲染线程
JS 引擎线程: 正常 js 执行时走这个。走完后把事件放进来继续走
事件触发线程 : 有回调走这个队列。页面跳转也属于。
定时触发器线程
异步 http 请求线程:有回调直接塞入事件触发
HTTP 会发完请求后（服务端接收到请求）是一个事件，会阻塞页面跳转等。但是发送结束后会把回调挂起，等回来才会放入事件，如果返回时间过长则不会等待返回。但是服务是发出去的。

#### 截止 2019.04.03

Python :
利用 sqlalchemy 工具连接数据库
利用 flask 实现接口 框架
利用 flask_bootstrap 规则 html 模板路径
socket 建立通讯端口
with open... 系列操作 io
等.

#### 截止 2020.05.01

尝试用 render 方式写一个 vue 组件[手动 Vue 项目实践/vue-cli/comp/vnode2.vue]
vite
虚拟无限下拉加载[手动 Vue 项目实践/vue-cli/views/fictitiousList.vue]

#### 截止 2020.05.07

增加了 react 官网的例子学习。
增加了 js 权威指南的 demo
增加了一些没有统计上的功能
更新了手动 Vue 项目实践中的 webpack 的打包。
增加了 Vue 的一些 Demo 示例

#### 截止 2020.05.18

增加了 vue 的原理实现。
增加了通过 postMessage/BroadcastChannel 实现的跨域数据通讯和不同 tab 窗体之间的通讯[iframe 跨域操作 && nodeTest/nodeFile]
通过后缀名称返回对应格式文件[nodeTest/nodeFile/index.js]
增加了 js 权威指南的 demo

#### 截止 2020.05.20

写了个轮询去爬取页面图片地址所拥有的尺寸值[nodeTest/pachong.js]
页面渲染顺序[页面渲染顺序]

#### 截止 2020.05.27

升级了 wing-time，优化/增加了代码方法。升级更多的时间获取方式。
对 Vue 的 watch 和 computed 的执行顺序进行测试

#### 2020.08.18

尝试 Vue3
新增雪碧图生成插件

#### 2020.09.11

babel 浏览学习

#### 2020.09.16

Vite && Ms 刷题

#### 2020.09.21

Vue-Ts 写组件尝试

#### 2020.09.25

(vue3ts)：增加 watch DEMO 了解 watch 处理逻辑
