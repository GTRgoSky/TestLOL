class MyPromise {
	constructor(executor) {
		this.status = 'pending';
		this.value = '';
		this.reason = '';
		this.successList = [];
		this.failList = [];

		let resolve = (val) => {
			if (this.status != 'pending') return;
			this.value = val;
			this.status = 'resolved';
			this.successList.map((el) => el());
		};

		let reject = (err) => {
			if (this.status != 'pending') return;
			this.reason = err;
			this.status = 'rejected';
			this.failList.map((el) => el());
		};

		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}

	then(onFulfilled, onRejected) {
		onFulfilled =
			typeof onFulfilled === 'function' ? onFulfilled : (y) => y;
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (err) => {
						throw err;
				  };

		let promise2;

		if (this.status === 'resolved') {
			promise2 = new MyPromise((resolve, reject) => {
				setTimeout(() => {
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
			promise2 = new MyPromise((resolve, reject) => {
				setTimeout(() => {
					let x = onRejected(this.reason);
					handlePromise(promise2, x, resolve, reject);
				}, 0);
			});
		}

		if (this.status === 'pending') {
			promise2 = new MyPromise((resolve, reject) => {
				this.successList.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.value);
							handlePromise(promise2, x, resolve, reject);
						} catch (e) {
							reject(e);
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

		return promise2;
	}

	catch(onRejected) {
		//在此处添加原型上的方法catch
		return this.then(null, onRejected);
	}

	static resolve(fun) {
		if (fun instanceof MyPromise) return fun;
		return new MyPromise((r, j) => {
			r(fun);
		});
	}

	static all(promiseList) {
		return new MyPromise((resolve, reject) => {
			let len = promiseList.length;
			let res = [];
			if (len === 0) resolve(res);
			promiseList.map((el, index) => {
				Promise.resolve(el).then(
					(r) => {
						res[index] = r;
						if (index + 1 === len) resolve(res);
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
	if (promise2 == x) return reject(new TypeError('circular reference'));
	if (x != null && (typeof x === 'function' || typeof x === 'object')) {
		let called;
		try {
			let then = x.then;
			if (typeof then === 'function') {
				then.call(
					x,
					(y) => {
						if (called) return;
						called = true;
						handlePromise(promise2, y, resolve, reject);
					},
					(err) => {
						if (called) return;
						called = true;
						reject(err);
					}
				);
			} else {
				resolve(x);
			}
		} catch (e) {
			if (called) return;
			called = true;
			reject(e);
		}
	} else {
		resolve(x);
	}
}
