// require('./lib/test1');
// require('./lib/test2');
// require('./lib/path');
// require('./lib/travel');
let copy = require('./lib/copy');
let copyBig = require('./lib/copyBig');
module.exports = {
    go:function(){
        console.log('我是主文件')
    },
    copy:copy,
    copyBig:copyBig
}