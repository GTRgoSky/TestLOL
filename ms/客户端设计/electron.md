
## 什么是 Elcctron


1、Electron 是一个跨平台的、基于 Web 前端技术（Nodejs, Javascript, HTML, CSS）的桌面 GUI 应用程序开发框架。Electron集成了Nodejs+Chromium。Nodejs主要负责应用程序主线程逻辑控制、底层交互等功能，Chromium主要负责渲染线程窗口的业务逻辑。[GUI：图形用户接口，是指采用图形方式显示的计算机操作用户界面]

2、支持几乎所有的浏览器功能，且拓展了一些功能查看更多


#### 优势
Electron 基于 Web 技术开发桌面应用。Web 技术是现如今软件开发领域应用最广泛的技术之一，入门门槛非常低，周边生态繁荣而且历史悠久。

1) Electron 开发效率高
2) Electron 执行效率高
    
    Node.js 本身也可以很方便地调用 C++ 扩展，Electron 应用内又包含 Node.js 环境，对于一些音视频编解码或图形图像处理需求，可以使用 Node.js 的 C++ 扩展来完成。

3) Electron 立足于 JavaScript 生态
4) 无需考虑兼容性问题

    Electron 内置了 Chromium 浏览器，该浏览器对标准支持非常好，甚至支持一些尚未通过的标准，所以基于 Electron 开发应用不会遇到兼容问题。开发者的自由度得到了最大化保护，你可以在 Electron 中使用几乎所有 HTML5、CSS3、ES6 标准中定义的 API。

5) Electron 可以使用操作系统接口

    Web 前端受限访问的文件系统、系统托盘、系统通知等，在 Electron 技术体系下均有 API 供开发者自由使用。

#### 缺点
1) 打包后的应用体积巨大

    todo: 开发者不做额外的 Hack 工作的话，用户每次升级应用程序，还要再下载一次同样体积的安装包

2) 开发复杂度较大，进阶曲线较陡--跨进程通信
3) 版本发布过快
4) 安全性问题
5) 资源消耗较大
6) Electron 还不支持老版本的 Windows 操作系统，比如 Windows XP

## 通信
在Electron中提供两种方法在主进程与渲染进程之间进行通信。
1) 使用ipcRenderer和ipcMain模块发送消息：能通过事件注册发布的方式实现数据传递
2) 使用remote模块进行 RPC 方式的通信：能通过方法直接调用以及全局变量获取来实现数据的传递

目录

    app----------------------------应用程序代码目录
    ├─main.js----------------------程序启动入口，主进程
    ├─common-----------------------通用模块
    ├─log--------------------------日志模块
    ├─config-----------------------配置模块
    ├─ipc--------------------------进程间通信模块
    ├─appNetwork-------------------应用通信模块
    └─browserWindows---------------窗口管理，渲染进程
        ├─components---------------通用组件模块
        ├─store--------------------数据共享模块
        ├─statics------------------静态资源模块
        └─src----------------------窗口业务模块
            ├─窗口A----------------窗口
            └─窗口B----------------窗口


渲染进程窗口实例通过Electron提供的BrowserWindow对象创建，每一个实例都是一个独立的进程，它只关心它所在运行的web页面。实例被销毁后，相应的渲染进程也会被销毁。且主进程被销毁后，渲染进程全部也会被销毁。在chrome浏览器的默认策略下，每一个tab都是独立的进程，Electron也正是利用了这一策略。

#### 举例子：
APP中有一个窗口来显示当前机器的CPU型号，总内存等信息。在Electron的渲染进程中，没有直接提供API去获取相关的信息，所以要借助主进程去获取信息后，传递到渲染进程显示。

remote：

    remote模块是Electorn专门设计用来增强渲染进程能力的对象，他提供了诸如require、getGlobal等方法来获取主进程的一些信息。当通过remote去调用远程方法和共享变量时，实际上是在发送相应的同步消息。

子进程获取主进程信息：

    require('electron').remote.require('主进程模块').function() // 直接执行主模块方法
    
子进程从数据共享获取数据：

    主：global['cpuInfo'] = cpuInfo;
    子：require('electron').remote.getGlobal('cpuInfo')

命令参数：

    主：process.argv
    子：require('electron').remote.process.argv

消息IPC：(可在拖拽环节看到)

IPC模块是Electron提供的用于主进程与渲染进程通信的模块，使用上跟事件的发布订阅类似，在消息的发起方通过ipc模块send事件，同时在接收方监听对应事件

    const ipc = require('electron').ipcMain;
    主：ipc.on('parent-key', (event, arg) {
        event.sender.send('child-key', message)
    })

    const ipc = require('electron').ipcRenderer;
    子：ipc.on('child-key', (event, message) {
        console.log(message);
    })；
    ipc.send('parent-key');

webContents.send方法（Main进程主动向Renderer进程发送消息）

渲染进程的通讯可以用ipc 也可以用 webContents ； global

## 本地存储
在 Electron 应用内存取本地数据，可以使用 Cookie、LocalStorage 或 IndexedDB 这些传统的前端技术。

也可以选择 electron-store

## 打包
electron-builder 是一个 Electron 的构建工具，它提供了自动下载、自动构建、自动打包、自动升级等能力，是 Electron 生态中的基础支持工具，大部分流行的 Electron 应用都使用它进行构建和分发。
#### electron-builder
文档：https://www.electron.build/configuration/configuration

version：22.10.5

这个还有一个[electron-webpack](https://webpack.electron.build/)的方式，项目中没有用到。

#### 各个平台配置

上述文档下：Configuration - MacOS / Windows / Linux

> 注意点：

packagejson里面的 main 入口要指向dist/main，否则打包后产出的获取不到main.js

postinstall： 它会在 electron-builder install-app-deps 运行时, 在app根目录创建node_modules依赖

webpack-target配置: https://webpack.js.org/configuration/target/

打包后的electron的资源是从Resources/app.asar 开始的，所以编码时资源路径要注意，可以用一个路径hook：

建议打包用各自的系统分开打包。

如果想在mac上打包win，需要下载一个wine。

并且由于github环境经常GG，所以，需要手动下一些包放入cache （eg：wine-4.0.1-mac.7z）。并且解压到（下面的对应系统路径）：

https://github.com/electron-userland/electron-builder/issues/1859

    macOS: ~/Library/Caches/electron-builder
    Linux: ~/.cache/electron-builder
    windows: %LOCALAPPDATA%\electron-builder\cache

## render / preload / main 文件介绍
这一节主要以quick-start作为介绍。
electron的主进程是通过main.js开始执行的。

当要渲染页面的时候，他会进入到渲染子进程。页面引入对应的render.js，拥有node的IO能力。

这里的开启主要是在 createWindow 时：
```js
const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    // 如果 nodeIntegration 被启用，那么渲染进程除了额外能够使用node模块的能力外，与普通网页没有什么区别
    nodeIntegration: true,
    // https://stackoverflow.com/questions/59523682/nodeintegration-true-ignored
    // 这边一个坑，没加这个会产生require是 undefined el 的 12版本中 contextIsolation 默认启用
    contextIsolation: false,
    // 开启remote
    enableRemoteModule: true,
    // 预加载 preload 
    preload: path.join(__dirname, 'preload.js')
    }
}) 
```

## 菜单介绍：
dock菜单：右键图标后产生的菜单选项
```js
const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click () { console.log('New Window') }
    }, {
      label: 'New Window with Settings',
      submenu: [
        { label: 'Basic' },
        { label: 'Pro' }
      ]
    },
    { label: 'New Command...' }
])
app.dock.setMenu(dockMenu);
```

任务栏菜单：左上角菜单选项
```js
const {Menu, app} = require("electron");
// 为了保证首个菜单保留
menuTemplate.unshift({label: app.getName()})
// 固定写法- 一般来说， template是一个options类型的数组，用于构建MenuItem
var menuBuilder = Menu.buildFromTemplate(menuTemplate);
// 在macOS上将 menu设置成应用内菜单 在windows和Linux上，menu 将会被设置成窗口顶部菜单
Menu.setApplicationMenu(menuBuilder);
```

右键菜单：右键菜单选项。在render.js做劫持右键事件。
    
```js
// 右键劫持
const { remote } = require('electron');
const { Menu } = remote;
const createContextMenu = () => {
    const contextTemplate = [
        {
            label: 'Cut',
            role: 'cut'
        },
        {
            label: 'Copy',
            role: 'copy'
        }
    ];
    const contextMenu = Menu.buildFromTemplate(contextTemplate);
    return contextMenu;
}

window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const contextMenu = createContextMenu();
    contextMenu.popup({
        window: remote.getCurrentWindow()
    });
}, false);
```



## 文件拖拽

将electron本地文件拖拽到桌面，需要文件的绝对路径
需要在子组建触发拖动事件并将文件路径传给主进程，主进程去执行拖拽的配置

参考文件拖拽栏目-- filedrop

#### 打开文件等操作采用 shell的能力
https://www.bookstack.cn/read/electronjs-12.0-zh/d16781a5164e937e.md

## 嵌入网页

Iframe；WebView；BrowserView
https://www.bookstack.cn/read/electronjs-12.0-zh/f7ab12e7834cb383.md

## 文件读写

目前DEMO中直接使用的 fs 模块读写， IPC通讯

## role 是什么

可以通过角色来为menu添加预定义行为。原生事件
## 自动更新

使用 electron-updater，设置packjson的pubulish。详见 src/main/update.js

服务端打包好新客户端后（注意配置新版本号），客户端会从服务端自动拉取。然后执行更新。主要文件：blockmap,latest.yml；

## 常用工具集合

[Devtron](https://github.com/electron-userland/devtron)
An Electron DevTools extension to help you inspect, monitor, and debug your app.

[electron-debug](https://github.com/sindresorhus/electron-debug)
Adds useful debug features.

[electron-localshortcut](https://github.com/parro-it/electron-localshortcut)
Add keyboard shortcuts locally to a window.

[electron-store](https://github.com/sindresorhus/electron-store)
Save and load data like user preferences, app state, cache, etc.

[electron-dl](https://www.electronjs.org/community)
Simplified file downloads.

[electron-drag](https://github.com/kapetan/electron-drag)
Improved window dragging.

[electron-sudo](https://github.com/automation-stack/electron-sudo)
Subprocesses with administrative privileges.

[electron-json-storage](https://github.com/electron-userland/electron-json-storage)
Write and read user settings.

[ipc-stream](https://github.com/jprichardson/electron-ipc-stream)
Duplex stream over IPC.

[electron-updater](https://github.com/electron-userland/electron-builder)
热更方式

[More](https://www.electronjs.org/community)

## 脚手架/模板

[electron-vue，使用vue-cli脚手架工具来创建项目](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/)

[electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
Boilerplate based on React and webpack.

[bozon](https://github.com/railsware/bozon)
Scaffold, run, test, and package your app.

[More](https://www.electronjs.org/community)

## 组件

[Photon](http://photonkit.com/)
UI toolkit for building beautiful apps.

[cookies](https://github.com/hstove/electron-cookies)
Adds support for `document.cookie`.

[More](https://www.electronjs.org/community)

## 参考地址

[官方文档中文](https://www.electronjs.org/docs) 

[社区/工具](https://www.electronjs.org/community)

[打包](https://www.electron.build/configuration/configuration)

## 其他读物

Electron + vue3 + vite 整合：https://www.jianshu.com/p/ee5ec23d4716?utm_campaign=haruki

Vue3+Electron整合方式：https://zhuanlan.zhihu.com/p/181015456

## DEMO 

开发：npm run dev

打包：npm run mac:pack || npm run win:pack -- 纯净免安装版打包

不带pack -- 安装包

[一个VueDEMO](https://umbrella22.github.io/electron-vue-template-doc/Overview/essentials/features.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%A4%B4%E9%83%A8)


## 开发中遇到的

1. 一些标签无法鼠标选中，加入：user-select: text;
2. mac中一些快捷键失效，需要手动注册，注意离开页面时注销
3. 源设置成国内，外国的挂的飞起

## node-ffi

#### 是什么？

node-ffi是使用纯JavaScript加载和调用动态库的node addon，它可以用来在不写任何C++代码的情况下调用动态链接库的API 接口。
解决dll、.so、.dylib调用问题。

[ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi)
node 版本12.x

许多教程是ffi的，这里坑超大，ffi对node版本支持比较低了。会导致很多版本不兼容，感谢napi

同理 [ref-napi](https://github.com/node-ffi-napi/ref-napi#readme) 也是

[一个简易的中文用法](https://zhuanlan.zhihu.com/p/40526242) 

还有一点就是这个要在主进程用，如果渲染进程用就用ipc通讯吧～

[node-gyp](https://github.com/nodejs/node-gyp#installation)

node-gyp是为了编译nodejs addon模块而构建的跨平台命令行工具。nodejs addon模块使用c++语言编写，在源代码级别进行分发，通过node-gyp实现跨平台的编译安装。

[这边有个巨坑，就是如果你用wepack打包了你的main，则bindings会找不到文件](https://github.com/TooTallNate/node-bindings/issues/50)

https://segmentfault.com/a/1190000019935749



## 如何使用thrift


[download](https://thrift.apache.org/docs/install/os_x.html)


[node-thrift](https://www.npmjs.com/package/node-thrift)


如果你用尽一切办法没有安装成libevent，请使用：

PKG_CONFIG_PATH: /usr/local/opt/openssl/lib/pkgconfig


./configure CFLAGS="-I/usr/local/opt/openssl/include" LDFLAGS="-L/usr/local/opt/openssl/lib" --prefix=/usr/local
[参考](https://blog.csdn.net/sunxiaoju/article/details/102980610)

