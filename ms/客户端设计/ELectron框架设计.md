## 子应用加载
1、 将业务根据模块拆分成可以独立打包部署的子应用。并且提供一个Service提供根据分支名查询资源地址作的功能。
2、 （客户端）根据本地配置下载对应资源到resources。
3、 配置文件（包含packageName和barnch）
4、 通过动态路由+SystemJs，动态引入资源文件。
4.1 首先是如何使用SystemJs的，在编译阶段通过 HtmlWebpackPlugin 将importmap（也就是packageKey：resourceValue） 注入到html页面中。
4.2 给vue-router加入守卫beforeEach，在路由跳转时我们会判断当前跳转地址的appName（我们是以路径的一级菜单为key的，也可以以name）是否属于子应用。
如果属于，则判断该子应用是否已经加载，如果没加载，则通过SystemJs引入。并且动态添加路由地址，并将该appName加入到白名单。

## 父子窗口通讯
子传父：
1、创建子Window时，以子windowName 为key 向主进程发送registry通知，
1.0 主进程创建监听事件，用于监听子窗口信息。
1.1 注册完成后，主窗口创建监听事件，用于监听主进程的通讯信息。
1.2 主进程的监听事件内触发一个send事件，向刚才注册的主窗口发送信息。
1.3 主窗口的监听事件执行回调函数。把信息传入回调函数
1.4 关闭子窗口时触发close 监听，会清除所有监听事件
父传子：
2、子窗口创建时是可以拿到子窗口的实例的
2.0 在相同window实例下可以通过ipc直接通讯。
2.1 创建子窗口时在父窗口起一个did-finish-load的监听，用于监听加载完成。加载完成后可以发送数据。
2.2 创建子窗口后，可以在子窗口内创建一个on监听，监听laod后发送的数据。

## 基础配置workspace
electron-settings设置defaultValue

## sqlite 替换 indexDB
配置 node-pre-gyp ；"rebuild": "electron-rebuild -f -w sqlite3"
externals： ['pg', 'sqlite3', 'tedious', 'pg-hstore']
sequelize

## 什么是gyp
重点在于，它是一套用于生成原生IDE项目文件的自动化构建工具
https://www.cnblogs.com/w4ngzhen/p/14086497.html

## 什么是node-gyp
（Python 2.x）
有些node模块直接或间接使用原生C/C++代码，这些东西要跨平台，就需要使用源码根据实际的操作平台环境进行原生模块编译！

简单来说，node是跨平台的，那么对于任何的node模块理论也是应该是跨平台的。然而，有些node模块直接或间接使用原生C/C++代码，这些东西要跨平台，就需要使用源码根据实际的操作平台环境进行原生模块编译。那么我们需要下载源码文件，通过node-gyp生成一定结构的代码项目让我们能够require引入（譬如，Windows下会生成vcxproj，再调用MSBuild进行编译，以生成Windows下的动态链接库，最后打包为一个原生node模块）。这个知乎回答的每一条可以看看：传送门。

因为node程序中需要调用一些其他语言编写的 工具 甚至是dll，需要先编译一下，否则就会有跨平台的问题，例如在windows上运行的软件copy到mac上就不能用了，但是如果源码支持，编译一下，在mac上还是可以用的。node-gyp在较新的Node版本中都是自带的（平台相关），用来编译原生C++模块。
node-gyp rebuild 在 Windows 下可以理解为调用 msbuid 进行该文件夹下的 sln 解决方案的 build ，例如我们在使用 serialport 的时候，经常要对 C++ 的代码进行本机编译得到 DLL 。

简单说：用来编译原生C++模块。在当前系统提前编译一下原生C++模块，能够运行（适配）当前操作系统的程序（文件），解决跨平台问题。

## node-pre-gyp：
在当前系统提前编译一下原生C++模块，根据不同平台编译出二进制文件
原生模块开发者将代码编译生成各个平台架构的二进制包直接发布到node-pre-gyp上，当我们的node项目安装原生模块时候。处理流程就是首先去node-pre-gyp上找有没有当前平台的组件包，有的话直接拉取使用，如果没有则进行原生编译。

## node-ffi
node-ffi，node-gyp提前编译
node-ffi是使用纯JavaScript加载和调用动态库的node addon，它可以用来在不写任何C++代码的情况下调用动态链接库的API 接口。
解决dll（win）、.so（linux）、.dylib（mac）调用问题。

## thrift
RPC（Remote Procedure Call）远程过程调用，简单的理解是一个节点请求另一个节点提供的服务。它被用来定义和创建跨语言的服务

它就是一个跑在浏览器里的环境，跑的是wasm文件，就和v8跑的js文件一样。不同的是wasm是编译后的机器码，js是解释性的源码

并不是说wasm就不需要通信了，先不提wasm没有文件操作你没办法读写数据库没办法调用训练，js调用wasm也是需要通信的。也是用的ipc。。和你直接用ipc与go写的原生可执行程序通信没有区别，甚至还要慢。

这是第一个点。第二个点，之所以引入thrift，是为了解决IPC的问题。不管你用什么语言什么runtime，都是需要解决的。而不是说我都用go就不用通信了，除非你全部跑在一个进程里或者共享内存。

那看来是你对thrift有误解😂它编译成js是用js封装了thrift的ipc协议，你用go，它也得编译成go的module，用python就得编译成python

第二个就是thrift，它只是一个通信协议，封装了ipc，之所以需要编译，是因为thrift要让不同的语言之间都能相互沟通，所以它有一套自己的格式，它把序列化和反序列化给你封装成了thrift这个库，然后它所做的就是把我们写的.thrift文件，也就是proto，翻译成各种语言的实现，这个是你所谓『