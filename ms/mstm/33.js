function ajax1() {
	console.log('1 start');
	return new Promise((r, j) => {
		setTimeout(() => {
			r(1);
		}, 2000);
	});
}

function ajax2() {
	console.log('2 start');
	return new Promise((r, j) => {
		setTimeout(() => {
			r(2);
		}, 200);
	});
}

function ajax3() {
	console.log('3 start');
	return new Promise((r, j) => {
		setTimeout(() => {
			r(3);
		}, 800);
	});
}

// 因为只有 reslove 才会继续执行 ，这里面 调用then后会把执行方法腿推到 successList 执行队列，等待 reslove 执行后在执行
// [ajax1(), ajax2(), ajax3()].reduce((total, currentValue) => {
// 	return total.then(() => {
// 		return currentValue.then((r) => {
// 			// 执行渲染
// 			console.log(r);
// 		});
// 	});
// }, Promise.resolve());

/**
 * 形成：
 * let e1 = ajax1();e2 = ajax2(); e3 = ajax3();
 * el.then((res1) => {
 *      render(res1)
 *      return el2
 * }).then(() => {
 *      return el2
 * }).then((res2) => {
 *      render(res2)
 * }).then(() => {
 *      return el3
 * }).then((res3) => {
 *      render(res3)
 * })
 */

[ajax1(), ajax2(), ajax3()]
	.reduce((total, currentValue) => {
		return total.then((r) => {
			console.log(r);
			return currentValue;
		});
	})
	.then((r) => {
		console.log(r);
	});

/**
 * 形成：
 * let e1 = ajax1();e2 = ajax2(); e3 = ajax3();
 * el.then((res1) => {
 *      render(res1)
 *      return el2
 * }).then((res2) => {
 *      render(res2).
 *      return el3
 * }).then((res3) => {
 *      render(res3)
 * })
 */