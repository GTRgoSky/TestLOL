//拷贝大文件
var fs = require('fs');
const path = require('path');

function copy(src, dst) {
    try{
        fs.createReadStream(src).pipe(fs.createWriteStream(dst)).on('error',(err)=>{console.log(err)});
    }catch(e){
        console.log(e);
    }
    
}

function main(argv,extname) {
    let arr = argv.map((el)=>{
        return path.resolve('copyTest', el+extname)
    })
    copy(arr[0], arr[1]);
}


module.exports = main