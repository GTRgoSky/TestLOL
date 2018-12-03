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

module.exports = {
    timeFormat
}

