const express = require('express');
const app = express();
const router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    let time = new Date();
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.originalUrl);
    let getTime = req.getTime = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} 
    ${time.getHours()}:${time.getMinutes().toString().padStart(2,0)}:${time.getSeconds().toString().padStart(2,0)}`;
    console.log(0);
    next();
});
// 定义网站主页的路由
router.get('/', function (req, res) {
    res.render('index',{a:1666});
});
// 定义 about 页面的路由
router.get('/about', function (req, res) {
    res.send('About birds');
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