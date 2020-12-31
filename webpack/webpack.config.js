const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
	// target:'async-node',
	//context 配置根目录地址。默认为执行启动 Webpack 时所在的当前工作目录
	mode: 'production', //production会自动压缩，还会在main.js设置全局变量process.env.NODE_ENV == '设置值'/production大小1.87mb/development大小2.09Mb
	entry: {
		main: ['@babel/polyfill', `./main.js`], //配置入口
	},
	output: {
        //配置输出选项
        path: path.resolve(__dirname, `./dist/`), //输出路径为，当前路径下
		filename: 'js/[name].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
        publicPath: '/', //老版本的可以不用配置但是新版本需要配置(拼接html引入main.js路径=> /dist/main.js)
    },
	module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { 
                test: /webpackloader\.js/, 
                use: [
                    {
                        loader: 'babel-loader'
					},
					{
                        loader: path.resolve(__dirname, './loader/customLoader2.js')
                    },
                    {
                        loader: path.resolve(__dirname, './loader/customLoader.js')
                    }
                ]
            },
        ]
    },
	resolve: {
		
	},
	// 排除引入
	externals: {
	
	},
	// 输出文件性能检查配置
	performance: {
		hints: false, // 关闭性能检查
		maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
		maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)
	},
	devtool: 'inline-source-map',
	devServer: {
        // https://www.webpackjs.com/configuration/dev-server/#devserver-index
        //配置webpack加载地址的host，port，地址路径
        host: '0.0.0.0',
        contentBase: '/',
        historyApiFallback: true,
        port: 8088,
        headers: {
            'X-foo': process.env.NODE_ENV == 'product' ? 'bar' : 'none',
        },
        overlay: true, // 编译出现错误时，将错误直接显示在页面上
        // string = 'info': 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none' | 'warning'
        // 隐藏客户端控制台的输出
        clientLogLevel: 'none',
        // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
        // quiet: true,
        // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
        noInfo: true,
        // 当打开被启用时，开发服务器将打开浏览器。
        // open: true,
        //允许浏览器使用您的本地IP打开
        useLocalIp: true,
        // proxy: { // 代理到后端服务接口
        //     '/': 'http://192.168.8.120:3010/vuehtml'
        // },
    },
	plugins: [
        new HTMLWebpackPlugin({
			filename: 'index.html',
			template: `./index.html`, //配置入口
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
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
};