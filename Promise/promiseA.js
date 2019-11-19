/** https://mp.weixin.qq.com/s/Yrwe2x6HukfqJZM6HkmRcw
 * https://github.com/Lucifier129/promise-aplus-impl/blob/master/src/naive.js
    promise 是一个包含 then 方法的对象或函数，该方法符合规范指定的行为。

    thenable 是一个包含 then 方法和对象或者函数。

    value 就是任意合法 JS 值。

    exception 就是 throw 语句抛出的值。

    reason 是一个指示 promise 为什么被 rejected 的值。
 */

const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj
const isPromise = promise => promise instanceof Promise

const PENGDING = 'pengding'; //pending状态promise可以切换到fulfilled或rejected
const FULFILLED = 'fulfilled'; //不能迁移到其它状态，必须有个不可变的 value。
const REJECTED = 'rejectde'; //不能迁移到其它状态，必须有个不可变的 reason。

/**
 *  
    一个 Promise 构造函数，有 state 和 result 两个属性。
    当 state 为 fulfilled 时，result 作为 value 看待。
    当 state 为 rejected 时，result 作为 reason 看待。

    构造 onFulfilled 去切换到 fulfilled 状态，构造 onRejected 去切换到 rejected 状态。

    构造 resolve 和 reject 函数，在 resolve 函数里，通过 resolvePromise 对 value 进行验证。

    配合 ignore 这个 flag，保证 resolve/reject 只有一次调用作用。

    最后将 resolve/reject 作为参数，传入 f 函数。

    若 f 函数执行报错，该错误就作为 reject 的 reason 来用。
 */
function Promise(f) {
    this.state = PENGDING;
    this.result = null;
    this.callbacks = []; //YXX_1

    let onFulfilled = value => transition(this, FULFILLED, value);
    let onRejected = reason => transition(this, REJECTED, reason);

    let ignore = false;
    let resolve = value => {
        if(ignore) return;
        ignore = true;
        resolvePromise(this, value, onFulfilled, onRejected);
    }
    let reject = reason => {
        if(ignore) return;
        ignore = true;
        onRejected(reason);
    }
    
    try {
        f(resolve, reject);
    } catch(error) {
        reject(error);
    }
};

/**
 *  YXX_1
 *  onFulfilled 和 onRejected 如果是函数，必须最多执行一次。
    onFulfilled 的参数是 value，onRejected 函数的参数是 reason。
    then 方法可以被调用很多次，每次注册一组 onFulfilled 和 onRejected 的 callback。它们如果被调用，必须按照注册顺序调用。
 */
Promise.prototype.then = function(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
        let callback = { onFulfilled, onRejected, resolve, reject };
        
        if(this.state === PENGDING) {
            this.callbacks.push(callback);
        }else {
            setTimeout(() => handleCallback(callback, this.state, this.result), 0);
        }
    })
}

/** 
 *  handleCallback 函数，根据 state 状态，判断是走 fulfilled 路径，还是 rejected 路径。
    先判断 onFulfilled/onRejected 是否是函数，如果是，以它们的返回值，作为下一个 promise 的 result。
    如果不是，直接以当前 promise 的 result 作为下一个 promise 的 result。
    如果 onFulfilled/onRejected 执行过程中抛错，那这个错误，作为下一个 promise 的 rejected reason 来用。
    then 方法核心用途是，构造下一个 promise 的 result。
*/
const handleCallback = (callback, state, result) => {
    let { onFulfilled, onRejected, resolve, reject } = callback;
    try {
        if(state === FULFILLED) {
            isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
        }else if(state == REJECTED) {
            isFunction(onRejected) ? resolve(onRejected(result)) : reject(result);
        }
    } catch(error) {
        reject(error)
    }
}

const handleCallbacks = (callback, state, result) => {
    while (callbacks.length) handleCallback(callback.shift(), state, result);
}

const transition = (promise, state, result) => {
    if(promise.state !== PENGDING) return;
    promise.state = state;
    promise.result = result;
    // transition 函数扩充如上，当状态变更时，异步清空所有 callbacks。
    setTimeout(() => handleCallbacks(promise.callbacks, state, result), 0);
};

const resolvePromise = (promise, result, resolve, reject) => {

    // 第一个判断 result 是不是 promise 本身，是就抛 TypeError 错误。
    if(result == promise) {
        let reason = new TypeError('Can not fufill promise with itself');
        return reject(reason);
    }

    // 第二个判断 result 是不是 promise 类型，是就调用 then(resolve, reject) 取它的 value 或 reason。
    if(isPromise(result)) {
        return result.then(resolve, reject);
    }

    // 第三个判断 result 是不是 thenable 对象，是就先取出 then，再用 new Promise 去进入 The Promise Resolution Procedure 过程。
    if(isThenable(result)) {
        try {
            let then = result.then;
            if(isFunction(then)) {
                return new Promise(then.bind(result)).then(resolve, reject);
            }
        } catch(error) {
            return reject(error);
        }
    }

    resolve(result);
}

module.exports = Promise