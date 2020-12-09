// https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#%E6%9C%AF%E8%AF%AD

class Promise {
	//创建一个Promise类
	constructor(executor) {
		this.status = 'pending'; //初始默认状态为pending
		this.value = undefined; //默认赋值为undefined
		this.reason = undefined; //默认赋值为undefined
		this.successStore = []; //定义一个存放成功函数的数组
		this.failStore = []; //定义一个存放失败函数的数组
		let resolve = (value) => {
			if (this.status === 'pending') {
				//只有状态为pending才能转换状态
				this.value = value; //将传递进来的的值赋给value保存
				this.status = 'resolved'; //将状态设置成resolved
				this.successStore.forEach((fnc) => fnc()); //一次执行数组中的成功函数
			}
		};
		let reject = (reason) => {
			if (this.status === 'pending') {
				//只有状态为pending才能转换状态
				this.reason = reason; //将传递进来的失败原因赋给reason保存
				this.status = 'rejected'; //将状态设置成rejected
				this.failStore.forEach((fnc) => fnc()); //依次执行数组中的失败函数
			}
		};
		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		} //默认执行executor
	}
	then(onFulfilled, onRejected) {
		// 处理值穿透 promise.then().then().then((res)=>{ });
		// onFulfilled 和 onRejected 必须是一个函数
		onFulfilled =
			typeof onFulfilled === 'function' ? onFulfilled : (y) => y;
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (err) => {
						throw err;
				  };

		let promise2; // 返回的新的promise
		if (this.status === 'resolved') {
			promise2 = new Promise((resolve, reject) => {
				setTimeout(() => {
					// then 在实际情况中时在微任务中，模拟用宏任务代表他是异步的
					try {
						let x = onFulfilled(this.value);
						handlePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			});
		}
		if (this.status === 'rejected') {
			promise2 = new Promise((resolve, reject) => {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason); //x存放返回的结果
						handlePromise(promise2, x, resolve, reject); //处理返回结果的函数，已经在上面定义
					} catch (e) {
						reject(e); //报错执行reject
					}
				}, 0);
			});
		}
		if (this.status === 'pending') {
			promise2 = new Promise((resolve, reject) => {
				this.successStore.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.value); //x存放返回的结果
							handlePromise(promise2, x, resolve, reject); //处理返回结果的函数，已经在上面定义
						} catch (e) {
							reject(e); //报错执行reject
						}
					}, 0);
				});
				this.failStore.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.reason); //x存放返回的结果
							handlePromise(promise2, x, resolve, reject); //处理返回结果的函数，已经在上面定义
						} catch (e) {
							reject(e); //报错执行reject
						}
					}, 0);
				});
			});
		}
		return promise2; //返回新的promise
	}
	catch(onRejected) {
		//在此处添加原型上的方法catch
		return this.then(null, onRejected);
	}

	all(promiseArrs) {
		//在Promise类上添加一个all方法，接受一个传进来的promise数组
		return new Promise((resolve, reject) => {
			//返回一个新的Promise
			let arr = []; //定义一个空数组存放结果
			let i = 0;
			function handleData(index, data) {
				//处理数据函数
				arr[index] = data;
				i++;
				if (i === promiseArrs.length) {
					//当i等于传递的数组的长度时
					resolve(arr); //执行resolve,并将结果放入
				}
			}
			for (let i = 0; i < promiseArrs.length; i++) {
				//循环遍历数组
				promiseArrs[i].then((data) => {
					handleData(i, data); //将结果和索引传入handleData函数
				}, reject);
			}
		});
	}
	race(promises) {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < promises.length; i++) {
				promises[i].then(resolve, reject);
			}
		});
	}

	static resolve(fun) {
		if (fun instanceof Promise) {
			return fun;
		}
		return new Promise((r, j) => {
			r(fun);
		});
	}

	static all(promiseList) {
		return new Promise((reslove, reject) => {
			let len = promiseList.length;
			let res = [];
			if (len === 0) return reslove(res);
			promiseList.map((el, index) => {
				Promise.resolve(el).then(
					(r) => {
						res[index] = r;
						if (index + 1 === len) reslove(res);
					},
					(j) => {
						reject(j);
					}
				);
			});
		});
	}
}

function handlePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return reject(new TypeError('circular reference'));
	}
	if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
		let called; //called控制resolve或reject 只执行一次，多次调用没有任何作用。
		try {
			let then = x.then; //取x.then()方法
			if (typeof then === 'function') {
				//如果是函数，就认为它是返回新的promise
				then.call(
					x,
					(y) => {
						//如果y是promise继续递归解析
						if (called) return;
						called = true;
						handlePromise(promise2, y, resolve, reject); //递归解析promise
					},
					(r) => {
						if (called) return;
						called = true;
						reject(r);
					}
				);
			} else {
				//不是函数，就是普通对象
				resolve(x); //直接将对象返回
			}
		} catch (e) {
			if (called) return;
			called = true;
			reject(e);
		}
	} else {
		//x是普通值，直接走then的成功回调
		resolve(x);
	}
}

var a = new Promise((r, j) => {
	console.log(111, 01);
	r(222);
})
	.then(
		(res) => {
			console.log(res, 02);
			return 333;
		},
		(err) => {}
	)
	.then(
		(res) => {
			console.log(res, 03);
			return new Promise((resolve, reject) => {
				//返回一个新的Promise
				resolve('hello world');
			});
		},
		(err) => {}
	)
	.then(
		(res) => {
			console.log(res, 04);
		},
		(err) => {}
	)
	.then(
		(res) => {
			console.log(res, 05);
		},
		(err) => {}
	);
