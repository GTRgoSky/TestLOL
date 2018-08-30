const express = require('express');
const app = express();
let fs = require('fs');
const path = require('path');

app.use(express.static('public'));

// 上传模块
var multer = require('multer');
// 实例化上传模块(前端使用参数名为file)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname))
    },
    filename: function (req, file, cb) {
        cb(null, 'upload.zip')
    },
})
var upload = multer({ storage: storage }).any();

//解压缩
const unzip = require('unzip');

//请求加密认证
const basicAuth = require('basic-auth')

app.get('/alive',function(req,res){
    console.log('alive',req)
    res.send('alive');
})
// 
app.post('/upload', upload, function (req, res) {
    let _url = req.body.my_field;
      /*修改上传文件地址*/
      upload(req,res,function(err){
        if (err) {
            console.log('上传失败');
        }else{
            console.log('上传成功');
        }
    });
    fs.createReadStream(path.resolve(__dirname+'/upload.zip')).pipe(unzip.Extract({ path: path.resolve(__dirname+'/'+'../'+_url) }));
    fs.unlink(path.resolve(__dirname+'/upload.zip'),function(err){
        console.log(err)
    })
    res.send('上传成功!'+'url:'+_url);
});

app.put('/testput',function(req,res){
    //所有用到的测试请求请走这里
    console.log('test start')
    // console.log(path.resolve(__dirname+'/public/test.json'))
    // req.pipe(fs.createWriteStream(path.resolve('test.json')))
    let file = fs.createWriteStream(path.resolve(__dirname+'/public/test.json'));
    req.pipe(file)
    res.send('get request');
})

app.get('/testauth',function(req,res){
    //所有用到的测试请求请走这里
    console.log('auth start')
    const credentials = basicAuth(req);
    console.log(req.auth)
    let str = '';
    if(credentials && (credentials.name == 'Yxx' && credentials.pass == 566)){
        //https://segmentfault.com/a/1190000013109445
        res.statusCode = 200;
        str = 'get auth';
    }else{
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')//告诉客户端可以在HTTP请求中带上Cookie
        res.statusCode = 401;
        str = '你没有权限访问服务器';
    }
    res.send(str);
})


//在其所有他中间件的后面添加一个处理 404 的中间件
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

//错误处理器中间件的定义和其他中间件一样，唯一的区别是 4 个而不是 3 个参数，即 (err, req, res, next)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


var server = app.listen(3520,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
