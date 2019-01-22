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
        throw Error('new Date(arguments).valueOf() is not a number , Please use the arguments like'+
        +'YYYY-MM-DD Or YYYY-MM-DD hh:mm:ss')
    }
    return date1 - date2 > 0 ? 1 : date1 - date2 == 0 ? 0 : -1;
}

//eg: type('测试对象')
module.exports = {
    timeFormat,
    whichType,
    timeCompare,
    timeSetFormat
}

