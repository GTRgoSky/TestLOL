(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let {timeFormat, holidayDate} = require('./use/time');

console.log(timeFormat('YYYY-MM-DD'));
console.log(holidayDate('20190204'));
},{"./use/time":2}],2:[function(require,module,exports){
'use strict';

//格式化当前时间。传入YYYY-MM-DD 或者 YYYY-MM-DD hh:mm:ss
const timeFormat = function(str){
    let type = null;
    let ans = null;
    if(str === 'YYYY-MM-DD') type = 1;
    if(str === 'YYYY-MM-DD hh:mm:ss') type = 2;
    if(!type) throw Error('Please use YYYY-MM-DD Or YYYY-MM-DD hh:mm:ss');
    const date = new Date();
    let year = date.getFullYear().toString();
    let mouth = (date.getMonth()+1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let mun = date.getMinutes().toString().padStart(2, '0');
    let sec = date.getSeconds().toString().padStart(2, '0');
    if(type == 1){
        ans = year + '-' + mouth + '-' + day;
    }else{
        ans = year + '-' + mouth + '-' + day + ' ' + hour + ':' + mun + ':' + sec;
    }
    if(!ans) throw Error('Something err');
    return ans;
}

//格式化导入时间。第一参数传入new Date()可以解析的时间 第二参数传入YYYY-MM-DD 或者 YYYY-MM-DD hh:mm:ss
const timeSetFormat = function(dateT, str){
    let type = null;
    let ans = null;
    if(str === 'YYYY-MM-DD') type = 1;
    if(str === 'YYYY-MM-DD hh:mm:ss') type = 2;
    if(!type) throw Error('Please use YYYY-MM-DD Or YYYY-MM-DD hh:mm:ss');
    const date = new Date(dateT);
    let year = date.getFullYear().toString();
    let mouth = (date.getMonth()+1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let mun = date.getMinutes().toString().padStart(2, '0');
    let sec = date.getSeconds().toString().padStart(2, '0');
    if(type == 1){
        ans = year + '-' + mouth + '-' + day;
    }else{
        ans = year + '-' + mouth + '-' + day + ' ' + hour + ':' + mun + ':' + sec;
    }
    if(!ans) throw Error('Something err');
    return ans;
}

//判断对象类型的js（Vue的判断方法）
const whichType = v => Object.prototype.toString.call(v).replace(/\[object /,'').replace(']','');

//比较2个时间大小(v1 > v2 返回 1 ； v1 == v2 返回 0 ； v1 < v2 返回 -1)
const timeCompare = (v1,v2) =>{
    // console.log(whichType(v1))
    if(whichType(v1) !== 'String' || whichType(v2) !== 'String') {
        throw Error('The arguments must be a String')
    }
    // if(v1.length < 11) {
    //     v1 += ' 00:00:00'
    // }
    // if(v2.length < 11) {
    //     v2 += ' 00:00:00'
    // }
    const date1 = new Date(v1).valueOf();
    const date2 = new Date(v2).valueOf();
    if(isNaN(date1) || isNaN(date2)) {
        throw Error('new Date(arguments).valueOf() is not a number , Please use the arguments like YYYY-MM-DD Or YYYY-MM-DD hh:mm:ss')
    }
    return date1 - date2 > 0 ? 1 : date1 - date2 == 0 ? 0 : -1;
}

//根据日期判断当前日期是否是[工作日 0 \ 休息日 1 \ 节假日 2]
//使用接口 http://api.goseek.cn/Tools/holiday?date= 
//接收参数 str 字符串类型  YYYY-MM-DD格式 也可以是 YYYYMMDD
const holidayDate = (str) =>{
    if(whichType(str) !== 'String') {
        throw Error('The arguments must be a String Like YYYY-MM-DD');
    };
    let _str = str.replace(/-/g,'');
    let _iframe = document.createElement('iframe');
    _iframe.src = 'http://api.goseek.cn/Tools/holiday?date='+_str;
    _iframe.style = 'display:none';
    document.body.appendChild(_iframe);
    console.log(_iframe.innerHTML)
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
}

module.exports = {
    timeFormat,
    whichType,
    timeCompare,
    timeSetFormat,
    holidayDate
}


},{}]},{},[1]);
