/*
@ create by yxx
用于处理html特殊字符。
只保存 换行 其余以字符串效果输出。
*/
function htmlStr(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\"/g, '&quot;')
		.replace(/\'/g, '&#39;')
		.replace(/\n/g, '<br>'); //转换格式,
}

module.exports = {
	htmlStr,
};
