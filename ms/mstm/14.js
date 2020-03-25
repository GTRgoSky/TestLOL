class LazyManClass {
	constructor(name) {
		this.queue = []; // 声明执行队列
		this.name = name;
		console.log(`Hi I am ${this.name}`);
		setTimeout(() => this.next(), 0);
	}
	sleepFirst(time) {
		let self = this;
		let fn = (function(t) {
			return function() {
				setTimeout(() => {
					console.log(`等待了${t}秒...`);
					self.next();
				}, 1000 * t);
			};
		})(time);
		this.queue.unshift(fn);
		return this;
	}
	eat(food) {
		let self = this;
		let fn = (function(f) {
			return function() {
				console.log(`I am eating ${f}`);
				self.next();
			};
		})(food);
		this.queue.push(fn);
		return this;
	}
	sleep(time) {
		let self = this;
		let fn = (function(t) {
			return function() {
				setTimeout(() => {
					console.log(`等待了${t}秒...`);
					self.next();
				}, 1000 * t);
			};
		})(time);
		this.queue.push(fn);
		return this;
	}
	next() {
		let fn = this.queue.shift();
		fn && fn();
	}
}

function LazyMan(name) {
	return new LazyManClass(name);
}

LazyMan('Tony')
	.eat('lunch')
	.eat('dinner')
	.sleepFirst(5)
	.sleep(4)
	.eat('junk food');
