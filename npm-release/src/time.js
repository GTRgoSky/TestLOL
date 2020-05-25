//格式化当前时间。传入YYYY-MM-DD 或者 YYYY-MM-DD hh:mm:ss
const timeFormat = function (str) {
	let type = null;
	let ans = null;
	if (str === 'YYYY-MM-DD') type = 1;
	if (str === 'YYYY-MM-DD hh:mm:ss') type = 2;
	if (str === 'hh:mm:ss') type = 3;
	if (!type) throw Error('Please use YYYY-MM-DD Or YYYY-MM-DD hh:mm:ss');
	const date = new Date();
	let year = date.getFullYear().toString();
	let mouth = (date.getMonth() + 1).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');
	let hour = date.getHours().toString().padStart(2, '0');
	let mun = date.getMinutes().toString().padStart(2, '0');
	let sec = date.getSeconds().toString().padStart(2, '0');
	if (type == 1) {
		ans = year + '-' + mouth + '-' + day;
	} else if (type === 2) {
		ans =
			year + '-' + mouth + '-' + day + ' ' + hour + ':' + mun + ':' + sec;
	} else if (type === 3) {
		ans = hour + ':' + mun + ':' + sec;
	}
	if (!ans) throw Error('Something err');
	return ans;
};

//格式化导入时间。第一参数传入new Date()可以解析的时间 第二参数传入YYYY-MM-DD 或者 YYYY-MM-DD hh:mm:ss
const timeSetFormat = function (dateT, str) {
	let type = null;
	let ans = null;
	if (str === 'YYYY-MM-DD') type = 1;
	if (str === 'YYYY-MM-DD hh:mm:ss') type = 2;
	if (!type) throw Error('Please use YYYY-MM-DD Or YYYY-MM-DD hh:mm:ss');
	const date = new Date(dateT);
	let year = date.getFullYear().toString();
	let mouth = (date.getMonth() + 1).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');
	let hour = date.getHours().toString().padStart(2, '0');
	let mun = date.getMinutes().toString().padStart(2, '0');
	let sec = date.getSeconds().toString().padStart(2, '0');
	if (type == 1) {
		ans = year + '-' + mouth + '-' + day;
	} else {
		ans =
			year + '-' + mouth + '-' + day + ' ' + hour + ':' + mun + ':' + sec;
	}
	if (!ans) throw Error('Something err');
	return ans;
};

/*
    ES6正则扩展： http://es6.ruanyifeng.com/#docs/regex#RegExp-prototype-sticky-属性
    获取传入时间格式的字符串
    传入格式 YYYY-MM-DD (可不带)hh:mm:ss 或者 时间戳
    eg: ('1999-12-12 12:12:12/时间戳', 'MM')获取月份
*/
const getTimeFormat = function (str, format) {
	if (!str || !format) {
		throw Error('arguments should be String But get undefined');
	}
	try {
		const getDate = timeSetFormat(str, 'YYYY-MM-DD hh:mm:ss');
		// const RE_DATE_Format = /(?<YYYY>YYYY)-(?<MM>MM)-(?<DD>DD) (?<hh>hh):(?<mm>mm):(?<ss>ss)/;
		const RE_DATE = /(?<YYYY>\d{4})-(?<MM>\d{2})-(?<DD>\d{2}) (?<hh>\d{2}):(?<mm>\d{2}):(?<ss>\d{2})/;
		const { groups: groups } = RE_DATE.exec(getDate);
		return format.replace(
			/YYYY|MM|DD|hh|mm|ss/g,
			(
				matched // 整个匹配结果
			) => {
				return groups[matched];
			}
		);
	} catch (err) {
		throw Error('请检查参数是否正确');
	}
};

//判断对象类型的js（Vue的判断方法）
const whichType = (v) =>
	Object.prototype.toString
		.call(v)
		.replace(/\[object /, '')
		.replace(']', '');

//比较2个时间大小(v1 > v2 返回 1 ； v1 == v2 返回 0 ； v1 < v2 返回 -1)
const timeCompare = (v1, v2) => {
	// console.log(whichType(v1))
	if (whichType(v1) !== 'String' || whichType(v2) !== 'String') {
		throw Error('The arguments must be a String');
	}
	const date1 = new Date(v1).valueOf();
	const date2 = new Date(v2).valueOf();
	if (isNaN(date1) || isNaN(date2)) {
		throw Error(
			'new Date(arguments).valueOf() is not a number , Please use the arguments like YYYY-MM-DD Or YYYY-MM-DD hh:mm:ss'
		);
	}
	return date1 - date2 > 0 ? 1 : date1 - date2 == 0 ? 0 : -1;
};

//根据日期判断当前日期是否是[工作日 0 \ 休息日 1 \ 节假日 2]
//使用接口 http://api.goseek.cn/Tools/holiday?date=
//接收参数 str 字符串类型  YYYY-MM-DD格式 也可以是 YYYYMMDD
// const holidayDate = (str) =>{
//     if(whichType(str) !== 'String') {
//         throw Error('The arguments must be a String Like YYYY-MM-DD');
//     };
//     let _str = str.replace(/-/g,'');
//     let _iframe = document.createElement('iframe');
//     _iframe.src = 'http://api.goseek.cn/Tools/holiday?date='+_str;
//     _iframe.style = 'display:none';
//     document.body.appendChild(_iframe);
//     console.log(_iframe.innerHTML)
//     //步骤一:创建异步对象
//     const ajax = new XMLHttpRequest();
//     //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
//     ajax.open('get','http://api.goseek.cn/Tools/holiday?date='+_str);
//     // ajax.setRequestHeader("wings","use UTF-8");
//     //步骤三:发送请求
//     ajax.send();
//     //步骤四:注册事件 onreadystatechange 状态改变就会调用
//     ajax.onreadystatechange = function (res) {
//        //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
// 　　　　console.log(ajax,res);//输入相应的内容
//     }
// }

module.exports = {
	timeFormat,
	whichType,
	timeCompare,
	timeSetFormat,
	getTimeFormat,
};
