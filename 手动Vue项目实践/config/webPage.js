const autoWebPlugin = require('./plugin').autoWebPlugin;
var vConsolePlugin = require('vconsole-webpack-plugin');
var webpack = require('webpack'); //引入文件
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
var argv = require('yargs').argv;
// const WebpackZipPlugin =require('webpack-zip-plugin')
// const FileManagerPlugin = require('filemanager-webpack-plugin');
// const {upload} = require('./upload.js');
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');//把编译好的代码放到单独的文件里面
// let lessExtract = new MiniCssExtractPlugin('less.css');
// const PurifyCssWebpack  = require('purifycss-webpack');//消除冗余代码
// const glob = require('glob');
let _arr = argv.fx.split('/');
console.log('argv:' + _arr);
let _url = _arr[0];
if (_arr.length > 1) {
	process.env.HOST_ENV = _arr[1];
}
require('../envconfig');
// let _url = '测试打包体积'
console.log('配置全局变量：' + process.env.NODE_ENV);
console.log('__dirname:' + __dirname);
const outPutUrl =
	process.env.NODE_ENV === 'product'
		? path.resolve(__dirname, '../../一个Node服务端测试/public/dist/')
		: path.resolve(__dirname, `../${_url}/dist/`);
console.log('outPutUrl:' + outPutUrl);

// console.log(JSON.parse(process.env.npm_config_argv).original[1]);//获取npm 后面的参数
// let _url = JSON.parse(process.env.npm_config_argv).original[1].replace(/.{3}/,'').replace(/.$/,'');//匹配前三位数--'和最后一位'
// console.log(_url);
let output = {
	//配置输出选项
	path: outPutUrl, //输出路径为，当前路径下
	// filename:'build.js',//输出后的文件名称
	filename: 'js/[name].js',
	chunkFilename: 'js/[name].[chunkhash:8].js',
	publicPath: process.env.NODE_ENV === 'product' ? '/dist/' : '' //老版本的可以不用配置但是新版本需要配置(拼接html引入main.js路径=> /dist/main.js)
};
let moduleConfig = {
	rules: [
		{ test: /\.vue$/, loader: 'vue-loader' },
		{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }, //设置node_modules里的js文件不用解析
		{
			test: /\.(png|jpg|gif)$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						// 这里的options选项参数可以定义多大的图片转换为base64
						limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
						outputPath: 'images' //定义输出的图片文件夹
					}
				}
			]
		},
		{
			test: /\.less$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader?minimize',
				'less-loader'
			]
		},
		{
			test: /\.css$/,
			// use: [MiniCssExtractPlugin.loader,'css-loader?minimize']
			// 提取出 Chunk 中的 CSS 代码到单独的文件中
			use: [MiniCssExtractPlugin.loader, 'css-loader?minimize']
		}
	],
	noParse: res => {
		return '';
	}
};
let devServer = {
	//配置webpack加载地址的host，port，地址路径
	host: 'localhost',
	contentBase: _url + '/',
	historyApiFallback: true,
	port: 8088,
	headers: {
		'X-foo': process.env.NODE_ENV == 'product' ? 'bar' : 'none'
	}
	// proxy: { // 代理到后端服务接口
	//     '/': 'http://192.168.8.120:3010/vuehtml'
	// },
};
const singlePage = {
	// target:'async-node',
	//context 配置根目录地址。默认为执行启动 Webpack 时所在的当前工作目录
	mode: 'production', //production会自动压缩，还会在main.js设置全局变量process.env.NODE_ENV == '设置值'/production大小1.87mb/development大小2.09Mb
	entry: {
		main: ['babel-polyfill', `./${_url}/main.js`] //配置入口
		// main: `./${_url}/main.js`,//配置入口
	},
	output: output,
	module: moduleConfig,
	resolve: {
		//其他的配置选项(解析，当遇到import vue 时会精准找到后面配置的PATH)
		// extensions: ['.js', '.vue', '.json'],
		alias: {
			vue$: 'vue/dist/vue.js' //vue文件地址配置(将 import vue 替换成 import vue/dist/vue.js)
		}
	},
	externals: {
		vue: 'Vue',
		'vue-router': 'VueRouter',
		vuex: 'Vuex'
	},
	// 输出文件性能检查配置
	performance: {
		// hints: 'warning', // 有性能问题时输出警告
		// hints: 'error', // 有性能问题时输出错误
		// hints: false, // 关闭性能检查
		maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
		maxEntrypointSize: 400000 // 最大入口文件大小 (单位 bytes)
		// assetFilter: function(assetFilename) { // 过滤要检查的文件
		//     return assetFilename.endsWith('.js');
		// }
	},
	devtool: process.env.NODE_ENV === 'product' ? 'none' : 'inline-source-map',
	// devtool: 'source-map',
	// devtool: 'none',
	devServer: devServer,
	plugins: [
		//这个是2.x中加的，各种loader的配置选项
		new webpack.LoaderOptionsPlugin({
			options: {
				babel: {
					presets: ['es2015'],
					plugins: ['transform-runtime']
				}
			}
		}),
		new vConsolePlugin({
			enable: false // 发布代码前记得改回 false,
		}),
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: `./${_url}/index.html` //配置入口
		}),
		// new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' })
		//do zip
		// new WebpackZipPlugin({
		//     initialFile: './dist',  //需要打包的文件夹(一般为dist)
		//     endPath: './',  //打包到对应目录（一般为当前目录'./'）
		//     zipName: 'upload.zip' //打包生成的文件名
		// })
		// new FileManagerPlugin({
		//     onEnd: {
		//     //   mkdir: ['./zip'],//创建文件夹
		//       archive: [
		//         { source: './dist', destination: './upload.zip' },
		//       ]
		//     }
		// }),
		//new MiniCssExtractPlugin({
		//　  filename: "[name].[chunkhash:8].css",
		// 　　chunkFilename: "[id].css"
		//}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash:8].css' //配置入口
			// chunkFilename: `[id].[chunkhash:8].css`
		}),
		// new HTMLWebpackPlugin({
		//     title: 'Code Splitting'
		// })
		//代码压缩
		// new UglifyjsWebpackPlugin(),
		//消除冗余css
		// new PurifyCssWebpack({
		//     paths:glob.sync(__dirname+'/dist/')
		// })
		//引入 process.env
		new webpack.DefinePlugin({
			'process.env.HOST_NAME': '"' + process.env.HOST_NAME + '"',
			test: '"' + '测试输入变量' + '"'
		})
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: 'comomn',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	}
};

const manyPage = {
	mode: 'production',
	entry: autoWebPlugin.entry({
		// 这里可以加入你额外需要的 Chunk 入口
	}),
	output: output,
	module: moduleConfig,
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.js' //vue文件地址配置(将 import vue 替换成 import vue/dist/vue.js)
		}
	},
	externals: {
		vue: 'Vue',
		'vue-router': 'VueRouter',
		vuex: 'Vuex'
	},
	performance: {
		maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
		maxEntrypointSize: 400000 // 最大入口文件大小 (单位 bytes)
	},
	devServer: devServer,
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				babel: {
					presets: ['es2015'],
					plugins: ['transform-runtime']
				}
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash:8].css' //配置入口
			// chunkFilename: `[id].[chunkhash:8].css`
		}),
		autoWebPlugin
	]
	// optimization: {
	//     splitChunks: {
	//        chunks: "all", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)'initial', // 只对入口文件处理
	//        minSize: 30000, // 最小尺寸，30000
	//        minChunks: 1, // 最小 chunk ，默认1
	//        maxAsyncRequests: 5, // 最大异步请求数， 默认5
	//        maxInitialRequests : 3, // 最大初始化请求书，默认3
	//        automaticNameDelimiter: '~',// 打包分隔符
	//        name: 'commond', // 打包后的名称，此选项可接收 function
	//        cacheGroups:{ // 这里开始设置缓存的 chunks
	//             //https://segmentfault.com/a/1190000013476837 || https://juejin.im/post/5af1677c6fb9a07ab508dabb
	//             default: {
	//                 minChunks: 1,
	//                 priority: -20,
	//                 reuseExistingChunk: true,
	//                 test:/assets\/|pages\//,
	//             },
	//             // commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
	//             //     test: /pages\/|components\//,
	//             //     name: 'css/common',
	//             //     priority: 10,
	//             //     enforce: true
	//             // },
	//             vendor: { // key 为entry中定义的 入口名称
	//                 chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async)
	//                 test: /[\\/]node_modules[\\/]/, // 正则规则验证，如果符合就提取 chunk
	//                 name: "vendor", // 要缓存的 分隔出来的 chunk 名称
	//                 minSize: 30000,
	//                 minChunks: 1,
	//                 enforce: true,
	//                 priority: 0,
	//                 maxAsyncRequests: 5, // 最大异步请求数， 默认1
	//                 maxInitialRequests : 3, // 最大初始化请求书，默认1
	//                 reuseExistingChunk: true // 可设置是否重用该chunk
	//             }
	//        }
	//     }
	// },
};

module.exports = {
	singlePage,
	manyPage
};
