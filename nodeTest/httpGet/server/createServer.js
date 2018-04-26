const routes = require('../route/setRoute');
const url = require('url');
const path = require('path');
let fs = require('fs');
// let querystring =require('querystring');
var multiparty = require('multiparty');

function routePath(req, res) {
    var pathObj = url.parse(req.url, true);//加上true得到的query为对象，否则为string
    var handleFn = routes[pathObj.pathname];
    console.log(__dirname,1);//__dirname返回当前文件路径
    if (handleFn) {//执行路由加载
        req.query = pathObj.query; // 将 query 绑定到 req 上
        var body = '';
        // var form = new multiparty.Form();
        // form.parse(req, function (err, fields, files) {
        //     res.writeHead(200, {'content-type': 'multipart/form-data'});
        //     console.log(err,fields,files);
        // });
        // 监听 POST 的数据内容
        req.on('data', function (chunk) {
            
            body += chunk;
            /*
                关于POST请求中的form-data、x-www-form-urlencoded、raw、binary的区别
                https://blog.csdn.net/ye1992/article/details/49998511
            */
        }).on('end', function () {
            req.body = parseBody(body);
            handleFn(req, res)
        })
    } else {
        //若没有该路由则404
        staticRoot(path.resolve(__dirname , '../test' ,'test.html'), req, res);
    }
}

function parseBody(body) {
    console.log(body,2);
    var obj = {};
    body.split('&').forEach(function (str) {
        obj[str.split('=')[0]] = str.split('=')[1]
    });
    return obj
}

//初始页面
function staticRoot(staticPath, req, res) {
    var pathObj = url.parse(req.url, true);
    /*
        http://localhost:8833?b=2 ==>
        pathObj = {
            protocol: null,
            slashes: null,
            auth: null,
            host: null,
            port: null,
            hostname: null,
            hash: null,
            search: '',
            query: {b:2},
            pathname: '/b',
            path: '/b',
            href: '/b'
        }
    */
    var filePath = path.join(staticPath, pathObj.pathname);
    /*
        filePath =                        
        http://localhost:8833 == > F:\自己测试完\nodeTest\node_modules\httpGet\test\test.html\
        http://localhost:8833/dasdas ==> F:\自己测试完\nodeTest\node_modules\httpGet\test\test.html\dasdas
    */
    //pathObj.pathname返回端口号后面的路径地址 eg：http://localhost:8833/dasdas 返回 ==> /dasdas
    fs.readFile(filePath, 'utf-8', function (err, content) {
        if (err) {
            res.writeHead('404', 'Not Found');
            res.end()
        } else {
            res.writeHead(200,  {
                "Content-Type": "text/html"
            });
            res.write(content);
            res.end()
        }
    })
}

module.exports = routePath