const net = require('net');

net.createServer(function (conn) {
    conn.on('data', function (data) {
        console.log(data.toString());
        /*
            data == client.write
        */
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ].join('\n'));
    });
}).listen(8778);


var options = {
    port: 8778,
    host: '10.33.80.115'
};

var client = net.connect(options, function () {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: www.baidu.com',
        'Accept: */*',
        '',
        ''
    ].join('\n'));
});

client.on('data', function (data) {
    /*
        data == conn.write
    */
    console.log(data.toString());
    client.end();
});