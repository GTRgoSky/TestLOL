//拷贝小文件的操作
var fs = require('fs');
const path = require('path');

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function main(argv,extname) {
    let arr = argv.map((el)=>{
        return path.resolve('copyTest', el+extname)
    })
    copy(arr[0], arr[1]);
}

module.exports = main
