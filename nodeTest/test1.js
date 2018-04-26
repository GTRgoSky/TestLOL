// console.log(123);

function test(){
    console.log('使用node test1.js 来触发我吧')
}

test();

var a = require('./moduleT');//a == 对象{a:mo}  或者理解为： module.exports == a
var b = require('./exportsT');// b == exports ,但是exports必须挂载一个属性才可以抛出去
var c = require('./exportsTT');//c == exports
var d = require('./testRequire'); // d从node_modules获取testRequire文件下的index
d.go();
if(process.env.doWhat === 'copy'){
    d.copy(['copy1','copy2'],'.js')//执行拷贝路径
}
if(process.env.doWhat === 'copyBig'){
    d.copyBig(['copy1','copy2'],'.xlsx')//拷贝大文件路径
}

if(process.env.doWhat == 'http'){
    var e = require('./httpGet');
}
// a.mo()
// b.ex.ex();
// c.hello();
