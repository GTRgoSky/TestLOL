const express = require('express');
const app = express();
const router = express.Router();
var http = require('http');
let fs = require('fs');
const path = require('path');
// 上传模块
var multer = require('multer');
// 实例化上传模块(前端使用参数名为file)
const _mainUrl = path.resolve(__dirname,'../../');//E:\TestLOL

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname+'/'+'../public'))
    },
    filename: function (req, file, cb) {
        cb(null, 'upload.zip')
    },
})
var upload = multer({ storage: storage }).any();

//解压缩
const unzip = require('unzip')


//https://blog.csdn.net/crisschan/article/details/74454208 清除host缓存 ipconfig /flushdns
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    let time = new Date();
    let getTime = req.getTime = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes().toString().padStart(2,0)}:${time.getSeconds().toString().padStart(2,0)}`;
    console.log('Request Type:', req.method , getTime);
    console.log('Request URL:', decodeURIComponent(req.originalUrl));
    next();
});
// 定义网站主页的路由
// router.get('/', function (req, res) {
//     res.render('index',{a:1666});
// });

router.get('/index', function (req, res) {
    res.render('index',{a:1666});
});

// 定义 about 页面的路由
router.get('/about', function (req, res) {
    res.send('About birds');
});

// 定义 about 页面的路由
router.get('/html', function (req, res) {
    //sendFile只可以传绝对路径
    res.sendFile(_mainUrl+'/关于Css的Demo/'+req.query.name+'.html');
});

// 定义 vue单 页面的路由
router.get('/vuehtml', function (req, res) {
    //sendFile只可以传绝对路径
    res.sendFile(_mainUrl+'/一个Node服务端测试/public/dist/index.html');
    // res.sendFile(_mainUrl+'/手动Vue项目实践/'+req.query.name+'/dist/index.html');
});

// 定义 多 页面的路由
router.get('/manyhtml', function (req, res) {
    //sendFile只可以传绝对路径
    res.sendFile(_mainUrl+'/一个Node服务端测试/public/dist/'+req.query.name+'.html');
    // res.sendFile(_mainUrl+'/手动Vue项目实践/'+req.query.name+'/dist/index.html');
});

// 定义 canvas的路由
router.get('/canvas', function (req, res) {
    //sendFile只可以传绝对路径
    res.sendFile(_mainUrl+'/canvas/'+req.query.name+'.html');
    // res.sendFile(_mainUrl+'/手动Vue项目实践/'+req.query.name+'/dist/index.html');
});

// 定义 about 页面的路由
router.get('/ppt', function (req, res) {
    //sendFile只可以传绝对路径
    res.sendFile(_mainUrl+'/关于Css的Demo/ppt/index.html');
});

// 定义 about 页面的路由
router.get('/gnHtml', function (req, res) {
    //sendFile只可以传绝对路径
    res.sendFile(_mainUrl+'/小功能实现/'+req.query.name+'.html');
});


// 定义 about 页面的路由
router.get('/pwa', function (req, res) {
    //sendFile只可以传绝对路径
    // console.log(path.resolve('/_mainUrl/pwa', req.query.name+'.html'))
    fs.readFile(path.resolve('/_mainUrl/pwa', req.query.name+'.html'), 'utf-8', function (err, data) { //读取内容
        if (err) {
            throw err
        };
        res.writeHead(200, {'Service-Worker-Allowed':'scope',  "Content-Type": "text/html"});
        res.write(data);
        res.end();
    });
});



// 定义 jsWap 页面的路由
router.get('/jsWap', function (req, res) {
    //sendFile只可以传绝对路径
    console.log('get jddWap')
    // res.sendFile(_mainUrl+'/一个Node服务端测试/public/index.html');
    fs.readFile(path.resolve('mydist', 'index.html'), 'utf-8', function (err, data) { //读取内容
        if (err) {
            throw err
        };
        res.writeHead(200, {
            "Content-Type": "text/html"
        }); //注意这里
        res.write(data);
        res.end();
    });
    // res.sendFile(_mainUrl+'/一个Node服务端测试/mydist/index.html');
});

// 定义 payment 页面的路由
router.get('/payment', function (req, res) {
    //sendFile只可以传绝对路径
    console.log('get payment')
    // res.sendFile(_mainUrl+'/一个Node服务端测试/public/index.html');
    res.sendFile(_mainUrl+'/一个Node服务端测试/mydist/payment/index.html');
});

// 定义 about 页面的路由
router.get('/po', function (req, res) {
    res.send('About birds 对等的6789');
});

//上传文件
router.post('/upload', upload, function (req, res) {
    let _url = req.body.my_field;
      /*修改上传文件地址*/
      upload(req,res,function(err){
        if (err) {
            console.log('上传失败');
        }else{
            console.log('上传成功');
        }
    });
    fs.createReadStream(path.resolve(__dirname+'/'+'../public/upload.zip')).pipe(unzip.Extract({ path: path.resolve(__dirname+'/'+'../public/'+_url) }));

    // 反馈上传信息
    res.send({
        'states':'success'
    });
});

module.exports = router




// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
    res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});