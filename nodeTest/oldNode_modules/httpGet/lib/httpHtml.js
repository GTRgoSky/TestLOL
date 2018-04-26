var http = require('http');
let fs = require('fs');
const path = require('path');

const routePath = require('../server/createServer');
//创建一个简单的http服务.并返回html
// http.createServer(function (request, response) {
//     response.writeHead(200, {
//         'Content-Type': 'text-plain'
//     });
//     fs.readFile(path.resolve('node_modules', 'httpGet', 'test', 'test.html'), 'utf-8', function (err, data) { //读取内容
//         if (err) {
//             throw err
//         };
//         response.writeHead(200, {
//             "Content-Type": "text/html"
//         }); //注意这里
//         response.write(data);
//         response.end();
//     });

// }).listen(8833);

var server = http.createServer(function (req, res) {
    routePath(req, res) // 对发送过来的url进行解析
}).listen(8833);