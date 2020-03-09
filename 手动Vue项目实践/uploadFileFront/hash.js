// 开启web-worker 并且单独处理文件得hash

self.importScripts('//cdn.bootcss.com/spark-md5/3.0.0/spark-md5.min.js'); // 导入脚本

// 生成文件 hash
self.onmessage = e => {
	console.log(e, 'webworker');
	const { fileChunkList } = e.data;
	const spark = new self.SparkMD5.ArrayBuffer();
	let percentage = 0;
	let count = 0;
	const loadNext = index => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(fileChunkList[index].file);
		reader.onload = e => {
			count++;
			spark.append(e.target.result);
			if (count === fileChunkList.length) {
				self.postMessage({
					percentage: 100,
					hash: spark.end()
				});
				self.close();
			} else {
				percentage += 100 / fileChunkList.length;
				self.postMessage({
					percentage
				});
				// 递归计算下一个切片
				loadNext(count);
			}
		};
	};
	loadNext(0);
};
