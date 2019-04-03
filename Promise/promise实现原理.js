// https://juejin.im/post/5afd2ff26fb9a07aaa11786c
function handlePromise(promise2, x, resolve, reject) {
    if (promise2 === x) { //promise2是否等于x,也就是判断是否将自己本身返回
        return reject(new TypeError('circular reference')); //如果是抛出错误
    }
    //判断x不是bull且x是对象或者函数
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called; //called控制resolve或reject 只执行一次，多次调用没有任何作用。
        try {
            let then = x.then; //取x.then()方法
            if (typeof then === 'function') { //如果是函数，就认为它是返回新的promise
                then.call(x, y => {  //如果y是promise继续递归解析
                    if (called) return;
                    called = true;
                    handlePromise(promise2, y, resolve, reject); //递归解析promise
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else { //不是函数，就是普通对象
                resolve(x); //直接将对象返回
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else { //x是普通值，直接走then的成功回调
        resolve(x);
    }
}
class Promise { //创建一个Promise类
    constructor(executor) {
        this.status = 'pending'; //初始默认状态为pending
        this.value = undefined; //默认赋值为undefined
        this.reason = undefined; //默认赋值为undefined
        this.successStore = []; //定义一个存放成功函数的数组
        this.failStore = []; //定义一个存放失败函数的数组
        let resolve = (value) => {
            if (this.status === 'pending') { //只有状态为pending才能转换状态
                this.value = value; //将传递进来的的值赋给value保存
                this.status = 'resolved'; //将状态设置成resolved
                this.successStore.forEach(fnc => fnc()); //一次执行数组中的成功函数
            }
        }
        let reject = (reason) => {
            if (this.status === 'pending') { //只有状态为pending才能转换状态
                this.reason = reason; //将传递进来的失败原因赋给reason保存
                this.status = 'rejected'; //将状态设置成rejected
                this.failStore.forEach(fnc => fnc()) //依次执行数组中的失败函数
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }//默认执行executor
    }
    then(onFulfilled, onRejected) { //等同于es5的Promise.prototype.then 当调用then的时候,根据状态，来执行不同的函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : y => y; //判断是否是一个函数
        onRejected = typeof onRejected === 'function' ? onRejected : errr => { //判断是否是一个函数
            throw err; //注意，这里不是返回值，而是抛出错误
        }
        let promise2; // 返回的新的promise
        if (this.status === 'resolved') { //如果状态是resolved
            promise2 = new Promise((resolve, reject) => {
                try {
                    let x = onFulfilled(this.value);
                    handlePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }

            })
            //执行成功的resolve，并将成功后的值传递过去
        }
        // if (this.status === 'rejected') { //如果状态是rejected
        //     onRejected(this.reason); //执行失败的reject,并将失败原因传递过去
        // }
        if (this.status === 'rejected') {
            promise2 = new Promise((resolve, reject) => {
                try {
                    let x = onRejected(this.reason); //x存放返回的结果
                    handlePromise(promise2, x, resolve, reject); //处理返回结果的函数，已经在上面定义
                } catch (e) {
                    reject(e);//报错执行reject
                }
            })
        }
        if (this.status === 'pending') {
            promise2 = new Promise((resolve, reject) => {
                this.successStore.push(() => {
                    try {
                        let x = onFulfilled(this.value); //x存放返回的结果
                        handlePromise(promise2, x, resolve, reject);//处理返回结果的函数，已经在上面定义
                    } catch (e) {
                        reject(e); //报错执行reject
                    }

                })
                this.failStore.push(() => {
                    try {
                        let x = onRejected(this.reason);//x存放返回的结果
                        handlePromise(promise2, x, resolve, reject);//处理返回结果的函数，已经在上面定义
                    } catch (e) {
                        reject(e);//报错执行reject
                    }
                })
            })
        }
        return promise2; //返回新的promise
    }
    catch(onRejected){ //在此处添加原型上的方法catch
        return this.then(null,onRejected);
    }
}

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('setTimeout');
    }, 500);
})
promise.then((res) => {
    console.log(res);
    return 111
}, (err) => {
    console.log(err);
}).then(res=>{
    console.log(res);
},rej=>{})
// module.exports = Promise; //将Promise导出