//上传文件到服务器
//http://www.bubuko.com/infodetail-2123563.html
//https://blog.csdn.net/shelly1072/article/details/55001453 ***
var request = require("request");
const http = require('http');
const fs = require('fs')

function upload(callback){
    var r = request.post('http://10.33.80.115:3520/upload', function(err, res, body) {
        if (err) {
            console.log(err)
            return;
        }
        console.log('服务器返回信息')
        if (typeof callback === 'function') callback(res,body);
    })
    var form = r.form();
    form.append('my_field', 'wap/test');
    form.append('my_file', fs.createReadStream('./upload.zip'));
}

exports.upload = upload;
