var webpack = require('webpack')  //引入文件
var vConsolePlugin = require('vconsole-webpack-plugin'); 
var argv = require('yargs').argv;

console.log('argv:'+argv.fx)
let _url = argv.fx;
// console.log(JSON.parse(process.env.npm_config_argv).original[1]);//获取npm 后面的参数
// let _url = JSON.parse(process.env.npm_config_argv).original[1].replace(/.{3}/,'').replace(/.$/,'');//匹配前三位数--'和最后一位'
// console.log(_url);
module.exports={
    entry:`./${_url}/main.js`, //配置入口
    output:{  //配置输出选项
        path:__dirname,//输出路径为，当前路径下
        filename:'build.js'//输出后的文件名称
    },
    resolve: {//其他的配置选项
        alias: {
            'vue': 'vue/dist/vue.js'//vue文件地址配置
        }
    },
    module:{
        loaders:[//loader配置，需要解析啥东西就用相关的loader
            {test:/\.vue$/, loader:'vue-loader'},
            {test:/\.js$/, loader:'babel-loader', exclude:/node_modules/}//设置node_modules里的js文件不用解析
        ]
    },
    devtool: 'inline-source-map',
    devServer: { //配置webpack加载地址的host，port，地址路径
        host:'10.33.80.115', 
        contentBase: _url+'/',
        historyApiFallback: true,
        port:8088 
    },
    plugins: [//这个是2.x中加的，各种loader的配置选项
        new webpack.LoaderOptionsPlugin({
            options: {
              babel:{
                  presets:['es2015'],
                  plugins:['transform-runtime']
              }
            }
        }),
        new vConsolePlugin({
            enable: true // 发布代码前记得改回 false
        }),
    ]
};