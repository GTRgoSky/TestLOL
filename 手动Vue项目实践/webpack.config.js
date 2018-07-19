var webpack = require('webpack')  //引入文件
var vConsolePlugin = require('vconsole-webpack-plugin'); 
// const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
var argv = require('yargs').argv;
// const WebpackZipPlugin =require('webpack-zip-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin');
const {upload} = require('./upload.js')
console.log('argv:'+argv.fx)
let _url = argv.fx;
// console.log(JSON.parse(process.env.npm_config_argv).original[1]);//获取npm 后面的参数
// let _url = JSON.parse(process.env.npm_config_argv).original[1].replace(/.{3}/,'').replace(/.$/,'');//匹配前三位数--'和最后一位'
// console.log(_url);
//https://segmentfault.com/q/1010000009642018/a-1020000009642094 关于打包的路径多出一个static
//https://www.mmxiaowu.com/article/58482558d4352863efb55475 关于vue不同情况下打包模式
module.exports={
    entry:`./${_url}/main.js`, //配置入口
    output:{  //配置输出选项
        path:__dirname+'/dist/',//输出路径为，当前路径下
        filename:'build.js',//输出后的文件名称
    },
    resolve: {//其他的配置选项(解析，当遇到import vue 时会精准找到后面配置的PATH)
        alias: {
            'vue$': 'vue/dist/vue.js'//vue文件地址配置
        }
    },
    module:{
        loaders:[//loader配置，需要解析啥东西就用相关的loader
            {test: /\.less$/,loader: 'style!css!less'},
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
            enable: false // 发布代码前记得改回 false,
        }),
        //do zip
        // new WebpackZipPlugin({
        //     initialFile: './dist',  //需要打包的文件夹(一般为dist)
        //     endPath: './',  //打包到对应目录（一般为当前目录'./'）
        //     zipName: 'upload.zip' //打包生成的文件名
        // })
        new FileManagerPlugin({
            onEnd: {
            //   mkdir: ['./zip'],//创建文件夹
              archive: [
                { source: './dist', destination: './upload.zip' },
              ]
            }
        })
        // new HTMLWebpackPlugin({
        //     title: 'Code Splitting'
        // })
        //代码压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //       warnings: false
        //     }
        // })
    ]
};

setTimeout(()=>{
    upload(function(res,body){
        console.log(body)
    })
},3000)