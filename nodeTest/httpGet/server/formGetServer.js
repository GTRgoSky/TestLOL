var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
const path = require('path');
const fs = require('fs');

http.createServer(function (req, res) {

    var form = new multiparty.Form();
    if (req.url === '/upload' && req.method === 'POST') {
        // parse a file upload
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.write('received upload:\n\n');
            //fields ==> fields: { title: [ '123' ], pass: [ '321' ]
            /*files ==> 
            { upload:
                [ { fieldName: 'upload',
                originalFilename: '需求.png',
                path: 'C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\4t9YkmXSvti5P84pvYuHcxVv.png',
                headers: [Object],
                size: 95580 } ] 
            }*/
            let filesName = files.upload[0];
            if (filesName.originalFilename) {
                fs.createReadStream(filesName.path).pipe(fs.createWriteStream(path.resolve(__dirname, '../upload', filesName.originalFilename))).on('error', (err) => {
                    console.log(err)
                });
            }
            //完成文件拷贝
            res.end(util.inspect({
                fields: fields,
                files: files
            }));
        });

        return;
    }
    if (req.url === '/uploadPart' && req.method === 'POST') {
        var count = 0;

        form.on('error', function (err) {
            console.log('Error parsing form: ' + err.stack);
        });

        // Parts are emitted when parsing the form
        form.on('part', function (part) {
            //可以用于传文件，流写入
            // You *must* act on the part by reading it
            // NOTE: if you want to ignore it, just call "part.resume()";

            if (part.filename) {
                // filename is defined when this is a file
                //http://www.techug.com/post/node-js-streams.html
                count++;
                let use = 'write';
                //part is a ReadableStream 可以用pipe写入指定目标文件（写入的第一种方法）
                if (use == 'pipe')
                    part.pipe(fs.createWriteStream(path.resolve(__dirname, '../upload', part.filename))).on('error', (err) => {
                        console.log(err)
                    });

                //写入的第二种方法(但是乱码，不看了。。)
                if (use == 'write') {
                    part.setEncoding('utf8');
                    part.on('data', (chunk) => {
                        fs.createWriteStream(path.resolve(__dirname, '../upload', part.filename)).write(chunk);
                    })
                }

                part.on('end', () => {
                    console.log('There will be no more data.');
                });
            }

            part.on('error', function (err) {
                // decide what to do
            });
        });

        form.on('field', function (name, value) {
            //表单的KEY : VALUE
            // You *must* act on the part by reading it
            // NOTE: if you want to ignore it, just call "part.resume()"
            console.log(name, value, 'value');
        });

        // Close emitted after form parsed
        form.on('close', function () {
            console.log('Upload completed!');
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.end('Received ' + count + ' files');
        });

        // Parse req
        form.parse(req);

        return;
    }
    // show a file upload form
    fs.readFile(path.resolve(__dirname, '../test', 'formHtml.html'), 'utf-8', function (err, content) {
        if (err) {
            res.writeHead('404', 'Not Found');
            res.end()
        } else {
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.write(content);
            res.end()
        }
    })
}).listen(8080);