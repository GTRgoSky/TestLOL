var express = require('express');
var app = express();
var index = require("./router/index"); //index
var test = require("./router/test"); //测试
var history = require('connect-history-api-fallback'); //Vue刷新
var connect = require('connect');
var ejs = require('ejs');
const path = require('path');


app.use(express.static(path.join(__dirname, 'mydist')))
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/dist', express.static('public'));
//app.use('/static', express.static('public'));//可以通过为静态资源目录指定一个挂载路径的方式来实现http://localhost:3000/static/

// app.use(history({
//     rewrites: [{
//         from: /[\s\S\w]*/,
//         to: '/'
//     }]
// }))

app.use('/', index);
app.use("/test", test)

app.set('view engine', 'ejs')
app.engine('ejs', ejs.__express)

//在其所有他中间件的后面添加一个处理 404 的中间件
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

//错误处理器中间件的定义和其他中间件一样，唯一的区别是 4 个而不是 3 个参数，即 (err, req, res, next)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


var server = app.listen(3010,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});