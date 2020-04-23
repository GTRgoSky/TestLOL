/**
 * 深度克隆
 * @param {String | Object | Array | Number | boolean | undefined | null} obj
 * @param {WeakMap} hash
 * 递归遍历自身属性=>返回基本类型，继续递归引用类型，用weakMap记录是否已经存在
 * weakMap可以防止内存泄漏，是个弱引用
 */
function deepClone(obj, hash = new WeakMap()) {
	if (hash.has(obj)) return obj; // 判断hash是否已经存在这个指
	var cobj;
	// if null
	if (obj === null) {
		return obj;
	}
	// 得到obj的类型
	let t = typeof obj;

	// 基本类型 如果是基本类型直接返回，如果不是进行递归
	switch (t) {
		case 'string':
		case 'number':
		case 'boolean':
		case 'undefined':
			return obj;
	}

	// 数组 如果是数组递归循环 = >
	/**
	 *  obj = [[1,2], 3, [4]];
	 *  => cobj = [
	 *  deepClone => cobj = [1,2] deepClone => return 1,2 ,
	 *  deepClone = > retun 3,
	 *  deepClone => cobj = [4]  deepClone => return 4
	 * ]
	 */
	if (Array.isArray(obj)) {
		cobj = [];
		obj.forEach((c, i) => {
			cobj.push(deepClone(obj[i]));
		});
	} else {
		cobj = {};
		if (Object.prototype.toString.call(obj) === '[object Object]') {
			/**
			 * Object && Symbol
			 * 如果是Object
			 */
			Object.getOwnPropertyNames(obj) //找到所有自身属性（包括不可枚举的）
				.concat(Object.getOwnPropertySymbols(obj)) // 获取自身所有 Symbols属性
				.forEach((c) => {
					// 遍历
					hash.set(obj, obj);
					cobj[c] = deepClone(obj[c], hash);
				});
		} else {
			//内置Object Function
			cobj = obj;
		}
	}
	return cobj;
}

var f = Symbol('f');
var a = {
	a: 1,
	b: {
		c: 2,
	},
	d: [3, [4, 5]],
	e: 'test',
	toString() {
		return 123;
	},
};
a[f] = 6;

var b = deepClone(a);
