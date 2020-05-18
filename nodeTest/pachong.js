const http = require('http');

var i = 301;
let pass = false;

function a() {
	http.get(
		'http://pic.ibaotu.com/01/12/41/91W888piCTun.jpg!fwc' + i,
		function (data) {
			var str = '';
			const contentType = data.headers['content-type'];
			data.on('data', function (chunk) {
				str += chunk; //监听数据响应，拼接数据片段
			});
			data.on('end', function () {
				console.log('第' + i + '次查询');
				if (contentType.includes('image')) {
					pass = true;
					console.log('找到了：', i);
				}
				if (i > 1000) {
					pass = true;
					console.log('没找到');
				}
				if (!pass) {
					i++;
					a();
				}
			});
		}
	);
}

a();
