var webpack = require('webpack')  //引入文件
const HTMLWebpackPlugin = require('html-webpack-plugin');
var argv = require('yargs').argv;
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// let _url = argv.fx;

module.exports={
    mode:'development',//production会自动压缩，还会在main.js设置全局变量process.env.NODE_ENV == '设置值'/production大小1.87mb/development大小2.09Mb
    entry: {
        main: `./main.ts`, //配置入口
    },
    output:{  //配置输出选项
        path: '/',//输出路径为，当前路径下
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:8].js',
        publicPath: '/dist/'//老版本的可以不用配置但是新版本需要配置(拼接html引入main.js路径=> /dist/main.js)
    },
    module:{
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            // 让 tsc 把 vue 文件当成一个 TypeScript 模块去处理，以解决 moudle not found 的问题，tsc 本身不会处理 .vue 结尾的文件
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {test:/\.vue$/, loader:'vue-loader'},
            {test:/\.js$/, loader:'babel-loader', exclude:/node_modules/},//设置node_modules里的js文件不用解析
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{ // 这里的options选项参数可以定义多大的图片转换为base64
                        limit:50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath:'images' //定义输出的图片文件夹
                    }
                }]
            }
        ],
        noParse: (res)=>{
            return ''
        }
    },
    resolve: {//其他的配置选项(解析，当遇到import vue 时会精准找到后面配置的PATH)
        alias: {
            'vue$': 'vue/dist/vue.js'//vue文件地址配置(将 import vue 替换成 import vue/dist/vue.js)
        },
        extensions: [ '.tsx', '.ts', '.js', 'vue']
    },
    externals: {
        "vue": 'Vue'
    },
    devtool: 'source-map',
    // 输出文件性能检查配置
    performance: { 
        maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
        maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)

    },
    devServer: { //配置webpack加载地址的host，port，地址路径
        host:'192.168.8.120', 
        contentBase: './',
        historyApiFallback: true,
        port: 8089,
    },
    plugins: [//这个是2.x中加的，各种loader的配置选项
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: `./index.html`, //配置入口
        }),
        new VueLoaderPlugin()
    ]
};
