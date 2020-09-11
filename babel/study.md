Babel 是一个编译器。从宏观角度看，它将运行代码分为 3 个阶段: 解析，转换，及生成

初始阶段，Babel 并没有做任何事情。它基本上就相当于 const babel = code => code;，先解析代码，然后再次生成相同的代码。

### preset(预设)

> 过语法转换器来支持最新版本的 JavaScript 。这些插件允许你立刻使用新语法，而无需等待浏览器支持

> 每年每个 preset 只编译当年批准的内容。 而 babel-preset-env 相当于 es2015 ，es2016 ，es2017 及最新版本。

#### TC39 将提案分为以下几个阶段:

Stage 0 - 稻草人: 只是一个想法，可能是 babel 插件。<br>
Stage 1 - 提案: 初步尝试。<br>
Stage 2 - 初稿: 完成初步规范。<br>
Stage 3 - 候选: 完成规范和浏览器初步实现。<br>
Stage 4 - 完成: 将被添加到下一年度发布。

### ES2015 及以后版本

ECMAScript 2015 是 2015 年 6 月被批准的 ECMAScript 标准。

> Babel 通过语法转换器来支持最新版本的 JavaScript 。这些插件允许你立刻使用新语法，而无需等待浏览器支持。查阅我们的 env preset 立即开始使用。
> eg: { "presets": ["env"] }

### Plugins

> 为 Babel 添加一些 Plugins 让其去做任何事情( Plugins 会影响 Babel 的第 2 阶段，转换)

如果 plugin 是通过 npm 安装，你可以传入 plugin 名字给 babel，babel 将检查它是否安装在 node_modules 中 => "plugins": ["babel-plugin-myPlugin"]

#### Plugin/Preset 简写

    如果你使用 babel-plugin- 作为 plugin 的前缀，你可以使用简写的形式省略掉该前缀。
    "plugins": ["myPlugin"]

    preset 与之相同
    "presets": ["babel-preset-myPreset"]
    vs
    "presets": ["myPreset"]

    这也适用于包裹作用域:
    "presets": ["@org/babel-preset-name"]
    简写:
    "presets": ["@org/name"]

#### Plugin/Preset 排序

    Plugin 会运行在 Preset 之前。
    Plugin 会从第一个开始顺序执行。ordering is first to last.
    Preset 的顺序则刚好相反(从最后一个逆序执行)。

    {
        // 将先执行 transform-decorators-legacy 再执行 transform-class-properties.
        "plugins": [
            "transform-decorators-legacy",
            "transform-class-properties"
        ]
        // 按以下顺序运行: stage-2， react， 最后 es2015 。
        "presets": [
            "es2015",
            "react",
            "stage-2"
        ]
    }

#### Plugin/Preset 选项

Plugin 和 Preset 均可以通过将名称和选项对象放置在同一个数组中来指定其选项。

    {
        "plugins": [
            ["transform-async-to-module-method", {
            "module": "bluebird",
            "method": "coroutine"
            }]
        ],
        "presets": [
            ["es2015", {
            "loose": true,
            "modules": false
            }]
        ]
    }

#### env 选项

在特定环境的时候，您可以用 env 选项来设置特定的配置：特定情景的设置项会被合并、覆盖到没有特定环境的设置项中

> env 选项的值将从 process.env.BABEL_ENV 获取，如果没有的话，则获取 process.env.NODE_ENV 的值，它也无法获取时会设置为 "development" 。(本地一般是 dev,发布一般环境为 product)

### babel-cli

Babel 附带一个内置的 CLI，可用于从命令行编译文件。此外，各种入口的脚本命令都位于 babel-cli/bin 的顶级包中。

### babel-polyfill

它会仿效一个完整的 ES2015+ 环境，并意图运行于一个应用中而不是一个库/工具。这个 polyfill 会在使用 babel-node 时自动加载。

> 这意味着你可以使用新的内置对象比如 Promise 或者 WeakMap, 静态方法比如 Array.from 或者 Object.assign, 实例方法比如 Array.prototype.includes 和生成器函数（提供给你使用 regenerator 插件）。为了达到这一点， polyfill 添加到了全局范围，就像原生类型比如 String 一样。

    使用 webpack，有许多种方式可以包含 polyfills：

    当与 babel-preset-env 一起使用时，

        如果在 .babelrc 中设置 useBuiltIns: 'usage'，则不要在 webpack.config.js entry 数组或 source 中包含 babel-polyfill。注意，仍然需要安装 babel-polyfill。

        如果在 .babelrc 中设置 useBuiltIns: 'entry'，那么在上面讨论的 require 或 import 的应用程序入口的顶部引入 babel-polyfill。

        如果在 .babelrc 中设置 useBuiltIns: 'false'，将 babel-polyfill 添加到 webpack.config.js 的入口数组中。

### babel-plugin-transform-runtime

> 解决插件重复被引入到各个引用文件中,解决内置插件和环境中变量冲突,将所有文件打包在了 babel-runtime(注释 1) 并在构建生产版本中被引入.

    Babel 使用了非常小的 helpers(注释3) 来实现诸如 _extend 等常用功能。默认情况下，它将被添加到每个通过 require 引用它的文件中。这种重复（操作）有时是不必要的，特别是当你的应用程序被拆分为多个文件时。

    这时则需要使用 transform-runtime：所有的 helper 都会引用模块 babel-runtime，以避免编译输出的重复问题。这个运行时会被编译到你的构建版本当中。

    这个转译器的另外一个目的就是为你的代码创建一个沙盒环境。如果你使用了 babel-polyfill，它提供了诸如 Promise，Set 以及 Map 之类的内置插件，这些将污染全局作用域。虽然这对于应用程序或命令行工具来说可能是好事，但如果你的代码打算发布为供其他人使用的库，或你无法完全控制代码运行的环境，则会成为问题。

    转译器将这些内置插件起了别名 core-js(注释2)，这样你就可以无缝的使用它们，并且无需使用 polyfill。

    请参阅 Technical details 以获取更多信息，可以了解它如何工作以及发生转换的类型。

    {
        "plugins": [
            ["transform-runtime", {
            "helpers": false, // 默认为 true // 是否切换将内联（inline）的 Babel helper（classCallCheck，extends 等）替换为对 moduleName 的调用
            "polyfill": false, // 默认为 true // 是否切换新的内置插件（Promise，Set，Map等）为使用非全局污染的 polyfill。
            "regenerator": true, // 默认为 true。// 是否切换 generator 函数为不污染全局作用域的 regenerator 运行时。
            "moduleName": "babel-runtime" // 默认为 "babel-runtime"。 // 当引入 helper 时，设置要使用的模块的名称/路径。
            }]
        ]
    }

    (注释1解)runtime 编译器插件做了以下三件事：
    当你使用 generators/async 函数时，自动引入 babel-runtime/regenerator 。
    自动引入 babel-runtime/core-js 并映射 ES6 静态方法和内置插件。
    移除内联的 Babel helper 并使用模块 babel-runtime/helpers 代替。

    (注释2解)core-js:
    有时你可能想要使用新的内置函数，例如 Map，Set，Promise 等。使用这些函数的唯一方式通常是引入一个污染全局的 polyfill。

    (注释3解)Helper:
    他就是一个辅助函数,帮忙在某些环境中实现高级语法
    通常，Babel 会将 helper 放置在文件顶部执行通用任务，以避免在文件中出现重复代码。有时这些 helper 可能会变得笨重，并且在文件中添加不必要的重复代码。

### 学习网址:

https://babel.docschina.org/docs/en/6.26.3/learn
