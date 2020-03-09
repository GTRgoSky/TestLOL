const http = require('http');
const server = http.createServer(); // https://blog.csdn.net/enjoy_sun_moon/article/details/80492450
const path = require('path');
const fs = require('fs');
const multiparty = require('multiparty');

const UPLOAD_DIR = path.resolve(__dirname, 'temporary/'); // 大文件存储目录

const mergeUrl = path.resolve(__dirname, 'file/'); // 大文件存储目录

const extractExt = filename =>
	filename.slice(filename.lastIndexOf('.'), filename.length); // 提取后缀名

server.on('request', async (req, res) => {
	// http://nodejs.cn/api/http.html#http_class_http_server

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
		res.status = 200;
		res.end();
		return;
	}
	let url = req.url;
	await router({ url, req, res });
});

// 文件切片方法
function chunkFile(req, res) {
	const multipart = new multiparty.Form(); // 处理formData提交的中间件

	// 因为正常情况回有权限问题，所以我们声明一个临时存储的路径
	const chunkDir = `${UPLOAD_DIR}`;

	// 切片目录不存在，创建切片目录
	if (!fs.existsSync(chunkDir)) fs.mkdirSync(chunkDir);

	multipart.uploadDir = UPLOAD_DIR;

	multipart.parse(req, (err, fields, files) => {
		if (err) return;
		/**
		 * chunk包含：
		 * path 是存储临时文件的路径
		 * size 是临时文件大小
		 */
		const [chunk] = files.chunk;

		const [hash] = fields.hash; //切片文件名
		// const [filename] = fields.filename;

		// 将文件从临时路径转移到新路径并重命名
		fs.renameSync(chunk.path, `${chunkDir}/${hash}`);

		res.end('received file chunk');
	});
}

const resolvePost = async req => {
	return await new Promise((resolve, reject) => {
		let chunk = '';
		req.on('data', data => {
			chunk += data;
		});
		req.on('end', () => {
			console.log(JSON.parse(chunk));
			resolve(JSON.parse(chunk));
		});
	});
};

// 合并切片
const mergeFileChunk = async (filePath, filename) => {
	const chunkDir = `${UPLOAD_DIR}`;
	const chunkPaths = fs.readdirSync(chunkDir); //读取目录的内容
	/**
	 * 与直接调用 fs.write() 的区别在于，
	 * 在某些异常情况下， fs.write() 可能只写入部分 buffer，
	 * 需要重试以写入剩余的数据，
	 * 而 fs.writeFile() 将会重试直到数据完全写入（或发生错误）。
	 */
	fs.writeFileSync(`${mergeUrl}/${filename}`, '');
	chunkPaths.forEach(chunkPath => {
		// 异步地将数据追加到文件，如果文件尚不存在则创建该文件。 data 可以是字符串或 Buffer。
		fs.appendFileSync(
			`${mergeUrl}/${filename}`,
			fs.readFileSync(`${chunkDir}/${chunkPath}`)
		);
		fs.unlinkSync(`${chunkDir}/${chunkPath}`); // 异步地删除文件或符号链接
	});
	fs.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};

async function useMergeFileChunk(req, res) {
	const data = await resolvePost(req);
	console.log(data);
	const { filename } = data;
	const filePath = `${UPLOAD_DIR}`;
	await mergeFileChunk(filePath, filename);
	res.end(
		JSON.stringify({
			code: 0,
			message: 'file merged success'
		})
	);
}

async function verifyFile(req, res) {
	const data = await resolvePost(req);
	const { fileHash, filename } = data;
	const ext = extractExt(filename);
	const filePath = `${UPLOAD_DIR}/${fileHash}${ext}`;
	if (fse.existsSync(filePath)) {
		res.end(
			JSON.stringify({
				shouldUpload: false
			})
		);
	} else {
		res.end(
			JSON.stringify({
				shouldUpload: true
			})
		);
	}
}

server.listen(8855, () => console.log('正在监听 8855 端口'));

// 路由地址
var routerLink = {
	'/chunkfile': chunkFile,
	'/merge': useMergeFileChunk,
	'/verify': verifyFile
};

// 路由
async function router({ url, req, res }) {
	console.log(url);
	await routerLink[url](req, res);
}
