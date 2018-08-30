//https://itbilu.com/nodejs/npm/E1Z0ypVLZ.html  request的中文文档
var request = require('request');
const fs = require('fs');
const path = require('path')

// request('http://10.33.80.115:3520/testall?test=nihao', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// try{
//     fs.createReadStream(path.resolve('./file.json')).pipe(fs.createWriteStream(path.resolve('./file2.json')))
// }catch(e){
//     console.log(e)
// }

//本地复制文件传到线上
//原生接文件：https://itbilu.com/nodejs/core/VkK5RCoXW.html
// fs.createReadStream(path.resolve('./file.json')).pipe(request.put('http://10.33.80.115:3520/testput'))

//拷贝线上图片到本地
// request.get('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532066779032&di=6cf062a34163a94f53169023a62ed4bd&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201210%2F02%2F20121002175342_C8TsF.thumb.700_0.jpeg').pipe(fs.createWriteStream(path.resolve('./file2.jpeg')));

// //服务器验证请求
request.get('http://10.33.80.115:3520/testauth', {
  'auth': {
    'user': 'Yxx',
    'pass': '566',
    'sendImmediately': false
  }
}, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    // console.log(response)
});