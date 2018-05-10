const {exec} = require('child_process');

//执行一个子线程，这样主线程只需要拿到子线程的结果，而不用关注过程
exec('node Process/chide_test.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    /*
    传给回调的 stdout 和 stderr 参数会包含子进程的 stdout 和 stderr 的输出。
     默认情况下，Node.js 会解码输出为 UTF-8，并将字符串传给回调。 encoding 选项可用于指定用于解码 stdout 和 stderr 输出的字符编码。
      如果 encoding 是 'buffer'、或一个无法识别的字符编码，则传入 Buffer 对象到回调函数。
     */
    console.log(stdout)//i get 
    console.log(stderr);
})