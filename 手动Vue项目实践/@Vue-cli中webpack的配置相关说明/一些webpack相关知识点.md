### webpack字典：
##### sourcemap
[Webpack中的sourcemap以及如何在生产和开发环境中合理的设置sourcemap的类型](https://blog.csdn.net/liwusen/article/details/79414508 "Webpack中的sourcemap以及如何在生产和开发环境中合理的设置sourcemap的类型")

##### webpack-merge
    const merge = require("webpack-merge");
    merge(
        {a : [1],b:5,c:20},
        {a : [2],b:10, d: 421}
    )
    //合并后的结果
    {a : [1,2] ,b :10 , c : 20, d : 421}

