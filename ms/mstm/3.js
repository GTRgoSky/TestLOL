/**
 *  我觉得这题主要是考察这三者在事件循环中的区别，事件循环中分为宏任务队列和微任务队列。
    其中settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行；
    promise.then里的回调函数会放到相应宏任务的微任务队列里，
    等宏任务里面的同步代码执行完再执行；
    async函数表示函数里面可能会有异步方法，await后面跟一个表达式，
    async方法执行时，遇到await会立即执行表达式，
    然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。
 */

// 1、setTimeout
function a() {
	console.log('script start'); //1. 打印 script start
	setTimeout(function() {
		console.log('settimeout'); // 4. 打印 settimeout
	}); // 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
	console.log('script end'); //3. 打印 script start
	// 输出顺序：script start->script end->settimeout
}
// a();
// 2、promise
function b() {
	console.log('script start');
	let promise1 = new Promise(function(resolve) {
		console.log('promise1');
		resolve();
		console.log('promise1 end');
	}).then(function() {
		console.log('promise2');
	});
	setTimeout(function() {
		console.log('settimeout');
	});
	console.log('script end');
}
// b();

// 3、async/await
function c() {
	async function async1() {
		console.log('async1 start');
		await async2();
		console.log('async1 end');
	}
	async function async2() {
		console.log('async2');
		await new Promise((r, j) => {
			console.log('async2 promise');
			r();
		}).then(r => {
			console.log('async2 promise resolve');
		});
	}

	console.log('script start');
	async1();
	console.log('script end');

	// 输出顺序：script start->async1 start->async2-> async2 promise -> script end
	// -> async2 promise resolve ->async1 end
}
// c();

// 无关测试 d在自己环境里改边自己
function d() {
	console.log('start', arguments);
	d = function() {
		return new Promise((r, j) => {
			console.log('Promise');
		});
	};
	return d.apply(this, arguments);
}

// d(1, 2, 3);

// 写出下面代码的运行结果
function e() {
	async function async1() {
		console.log('async1 start');
		await async2();
		console.log('async1 end');
	}
	async function async2() {
		console.log('async2');
	}
	console.log('script start');
	setTimeout(function() {
		console.log('setTimeout');
	}, 0);
	async1();
	new Promise(function(resolve) {
		console.log('promise1');
		resolve();
	}).then(function() {
		console.log('promise2');
	});
	console.log('script end');
	// 在部分node 或者老版本其他浏览器中 promise2 可能在 async1 end之前
	// script start -> async1 start -> async2 -> promise1 -> script end
	// -> async1 end -> promise2 -> setTimeout
}

e();

/***
 * ----宏任务----
 * (macro)task（又称之为宏任务），
 * 可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。
 * 
 * 
	浏览器为了能够使得JS内部(macro)task与DOM任务能够有序的执行，
	会在一个(macro)task执行结束后，在下一个(macro)task 执行开始前，对页面进行重新渲染，流程如下：
	(macro)task->渲染->(macro)task->...


	(macro)task主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)

	---- 微任务 ----
	microtask（又称为微任务），可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前task任务后，下一个task之前，在渲染之前。

	所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染。也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）。

	microtask主要包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)
 * 
 */
