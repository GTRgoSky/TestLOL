// 打包所有theme下的scss。原来版本是在packjson加命令行，多样式比较麻烦
const { exec } = require('child_process'); // 引入执行命令模块
let argv = process.argv[2];
// let defaultUrl = __dirname + '/mstm/' + argv + '.js'; // 'module的加载顺序/main.js'
let defaultUrl = __dirname + '/module的加载顺序/循环加载/' + argv + '.js'; // 'module的加载顺序/main.js'
let babelStr = 'babel-node ' + defaultUrl;
console.log('开始执行命令：', babelStr);
exec(babelStr, (error, stdout, stderr) => {
	if (error) {
		console.error(`执行出错: ${error}`);
		return;
	}
	// console.log(`stdout: ${stdout}`);
	//   console.log(`stderr: ${stderr}`);
	console.log('结果：\n', stdout);
});
