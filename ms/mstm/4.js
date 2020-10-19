// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
// es6
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
function a() {
	let [...ar] = new Set(arr.flat(Infinity));
	ar.sort((a, b) => {
		return a - b;
	});
	console.log(ar);
}
// a();

// es5
function b() {
	Array.prototype.unique = function () {
		return [...new Set(this)];
	};
	let ar = arr
		.toString()
		.split(',')
		.sort((a, b) => {
			return a - b;
		})
		.map(Number)
		.unique();

	console.log(ar);
}
b();
