var http = require('http');
let fs = require('fs');
const path = require('path');
var url = require('url');

http.createServer(function (request, response) {
    var body = [];
    var string = ''
    // console.log(request.method,1);
    // console.log(request.headers,2);
    var pathname = url.parse(request.url).pathname;
    // console.log(request)
    let test = new Buffer('------');
    let test2 = Buffer.from('------');
    //test2 != test 但是返回的字符串是相等的
    request.on('data', function (chunk) {
        //这个只有在POST递交时会变化，接收的事Buffer数据
        body.push(chunk,test2);
        // string = chunk;
    });

    request.on('end', function () {
        body = Buffer.concat(body);
        // console.log(body.toString());
        // response.end('Hello World -- 8834 &&\n'+body.toString());
        // console.log(string,1);
        console.log(body,2)
        response.end('Hello World -- 8834 &&\n'+body);
    });
    
}).listen(8834);


var options = {
    hostname: '10.33.80.115',
    port: 8834,
    path: '',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

var request = http.request(options, function (response) {
    response.on('data',function(chunk){ 
        console.log(new Buffer(chunk).toString());//将Buffer转为string
    });
});

request.write('Hello World Test');
request.write('Hello World Test 2');
request.end();