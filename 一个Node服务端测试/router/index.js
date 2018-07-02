const express = require('express');
const app = express();
const router = express.Router();
var http = require('http');
let fs = require('fs');
const path = require('path');
//https://blog.csdn.net/crisschan/article/details/74454208 清除host缓存 ipconfig /flushdns
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    let time = new Date();
    let getTime = req.getTime = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes().toString().padStart(2,0)}:${time.getSeconds().toString().padStart(2,0)}`;
    console.log('Request Type:', req.method , getTime);
    console.log('Request URL:', req.originalUrl);
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
    res.sendFile('F:/自己测试完/关于Css的Demo/'+req.query.name+'.html');
});

// 定义 about 页面的路由
router.get('/gnHtml', function (req, res) {
    //sendFile只可以传绝对路径
    res.sendFile('F:/自己测试完/小功能实现/'+req.query.name+'.html');
});


// 定义 about 页面的路由
router.get('/pwa', function (req, res) {
    //sendFile只可以传绝对路径
    // console.log(path.resolve('/自己测试完/pwa', req.query.name+'.html'))
    fs.readFile(path.resolve('/自己测试完/pwa', req.query.name+'.html'), 'utf-8', function (err, data) { //读取内容
        if (err) {
            throw err
        };
        res.writeHead(200, {'Service-Worker-Allowed':'scope',  "Content-Type": "text/html"});
        res.write(data);
        res.end();
    });
});


// 定义 wap 页面的路由
router.get('/wap/home', function (req, res) {
    //sendFile只可以传绝对路径
    console.log('get wap')
    // res.sendFile('F:/自己测试完/一个Node服务端测试/public/index.html');
    res.sendFile('F:/自己测试完/一个Node服务端测试/mydist/wap/home/index.html');
});

// 定义 qmWap 页面的路由
router.get('/qmWap', function (req, res) {
    //sendFile只可以传绝对路径
    console.log('get qmWap')
    // res.sendFile('F:/自己测试完/一个Node服务端测试/public/index.html');
    res.sendFile('F:/自己测试完/一个Node服务端测试/mydist/index.html');
});

// 定义 jsWap 页面的路由
router.get('/jsWap', function (req, res) {
    //sendFile只可以传绝对路径
    console.log('get jddWap')
    // res.sendFile('F:/自己测试完/一个Node服务端测试/public/index.html');
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
    // res.sendFile('F:/自己测试完/一个Node服务端测试/mydist/index.html');
});

// 定义 payment 页面的路由
router.get('/payment', function (req, res) {
    //sendFile只可以传绝对路径
    console.log('get payment')
    // res.sendFile('F:/自己测试完/一个Node服务端测试/public/index.html');
    res.sendFile('F:/自己测试完/一个Node服务端测试/mydist/payment/index.html');
});

// 定义 about 页面的路由
router.get('/po', function (req, res) {
    res.send('About birds 对等的6789');
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