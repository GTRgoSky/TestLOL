## preset 汇总集合:

### babel-preset-env:

> 在没有任何配置选项的情况下，<br>
> babel-preset-env 与 babel-preset-latest（或者 babel-preset-es2015，babel-preset-es2016 和 babel-preset-es2017 全部）的行为完全相同。

    eg:
    {
        "presets": [
            "env",
            {
                "targets": {
                    // 支持每个浏览器最后两个版本和 Safari 大于等于 7 版本所需的 polyfill 和代码转换
                    "browsers": ["last 2 versions", "safari >= 7"],

                    // 目标开发 Node.js 你可以使用 "node": "current" 来包含用于运行 Babel 的 Node.js 最新版所必需的 polyfill 和 transform 。
                    node": "6.10"
                }
            }
        ]
    }
