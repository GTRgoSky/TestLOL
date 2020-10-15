class Promise {
	constructor(init) {
		this.status = 'pending';
		this.value = '';
		this.reason = '';
		this.successList = [];
		this.faileList = [];

		const reslove = (res) => {
			if (this.status !== 'pending') return;
			this.status = 'resloved';
			this.value = res;
			this.successList.map((el) => el());
		};

		const reject = (res) => {
			if (this.status !== 'pending') return;
			this.status = 'rejectd';
			this.reason = res;
			this.faileList.map((el) => el());
		};

		try {
			init(reslove, reject);
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
				: (errr) => {
						throw err;
				  };

		let promise2 = null;

		if (this.status === 'resloved') {
			promise2 = new Promise((reslove, reject) => {
				setTimeout(() => {
					try {
						let x = onFulfilled(this.value);
						handlePromise(promise2, x, reslove, reject);
					} catch (e) {
						// 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e。
						reject(e);
					}
				}, 0);
			});
		}

		if (this.status === 'rejectd') {
			promise2 = new Promise((reslove, reject) => {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason);
						handlePromise(promise2, x, reslove, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			});
		}

		if (this.status === 'pending') {
			promise2 = new Promise((reslove, reject) => {
				this.successList.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.value);
							handlePromise(promise2, x, reslove, reject);
						} catch (e) {
							// 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e。
							reject(e);
						}
					}, 0);
				});
				this.faileList.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.reason);
							handlePromise(promise2, x, reslove, reject);
						} catch (e) {
							reject(e);
						}
					}, 0);
				});
			});
		}

		return promise2;
	}
}

function handlePromise(promise2, x, reslove, reject) {
	if (promise2 === x) throw Error('防止死循环');
	if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
		try {
			let then = x.then;
			let called; //called控制resolve或reject 只执行一次，多次调用没有任何作用。
			if (typeof then === 'function') {
				then.call(
					x,
					(y) => {
						if (called) return;
						called = true;
						// 因为要把 新返回值作为上一个的reslove返回
						handlePromise(promise2, y, reslove, reject);
					},
					(r) => {
						if (called) return;
						called = true;
						reject(r);
					}
				);
			} else {
				reslove(x);
			}
		} catch (e) {
			reject(e);
		}
	} else {
		reslove(x);
	}
}
