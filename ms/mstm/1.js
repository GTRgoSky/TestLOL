/**
 * 请分别用深度优先思想和广度优先思想实现一个拷贝函数
 */

console.log('请分别用深度优先思想和广度优先思想实现一个拷贝函数:\n');
// 工具函数
let _toString = Object.prototype.toString;
let map = {
	array: 'Array',
	object: 'Object',
	function: 'Function',
	string: 'String',
	null: 'Null',
	undefined: 'Undefined',
	boolean: 'Boolean',
	number: 'Number',
};
let getType = (item) => {
	return _toString.call(item).slice(8, -1);
};
let isTypeOf = (item, type) => {
	return map[type] && map[type] === getType(item);
};

// 深复制 深度优先遍历
let DFSdeepClone = (obj, visitedArr = []) => {
	let _obj = {};
	if (isTypeOf(obj, 'array') || isTypeOf(obj, 'object')) {
		let index = visitedArr.indexOf(obj);
		_obj = isTypeOf(obj, 'array') ? [] : {};
		if (~index) {
			// ~暂时可以理解为取反 并且 -1
			// 判断环状数据
			_obj = visitedArr[index];
		} else {
			visitedArr.push(obj);
			for (let item in obj) {
				_obj[item] = DFSdeepClone(obj[item], visitedArr);
			}
		}
	} else if (isTypeOf(obj, 'function')) {
		_obj = eval('(' + obj.toString() + ')');
	} else {
		_obj = obj;
	}
	return _obj;
};

//广度优先遍历
/***
 * 利用对象指针的思路，每层只对指针进行操作，同事影响了最外层对象的最终值
 */
let BFSdeepClone = (obj, hashMap = new WeakMap()) => {
	let origin = [obj],
		copyObj = {},
		copy = [copyObj];
	while (origin.length > 0) {
		let items = origin.shift(),
			_obj = copy.shift();
		if (isTypeOf(items, 'object') || isTypeOf(items, 'array')) {
			for (let item in items) {
				let val = items[item];
				if (isTypeOf(val, 'object')) {
					if (!hashMap.has(val)) {
						_obj[item] = {};
						//下次while循环使用给空对象提供数据
						origin.push(val);
						// 推入引用对象
						copy.push(_obj[item]);
					} else {
						_obj[item] = hashMap.get(val);
					}
					hashMap.set(val, val);
				} else if (isTypeOf(val, 'array')) {
					// 数组类型在这里创建了一个空数组
					_obj[item] = [];
					origin.push(val);
					copy.push(_obj[item]);
				} else if (isTypeOf(val, 'function')) {
					_obj[item] = eval('(' + val.toString() + ')');
				} else {
					_obj[item] = val;
				}
			}
		} else if (isTypeOf(items, 'function')) {
			copyObj = eval('(' + items.toString() + ')');
		} else {
			copyObj = obj;
		}
	}
	return copyObj;
};

let b = { a: { c: 3 }, b: 2 };
let c = b;
let a = BFSdeepClone({ a: { c: 3 }, b: 2 });
console.log(a == b, b == c, a == c);
return;
//测试

/**测试数据 */
// 输入 字符串String
// 预期输出String
let str = 'String';
var strCopy = DFSdeepClone(str);
var strCopy1 = BFSdeepClone(str);
console.log(strCopy, strCopy1); // String String 测试通过
// 输入 数字 -1980
// 预期输出数字 -1980
let num = -1980;
var numCopy = DFSdeepClone(num);
var numCopy1 = BFSdeepClone(num);
console.log(numCopy, numCopy1); // -1980 -1980 测试通过
// 输入bool类型
// 预期输出bool类型
let bool = false;
var boolCopy = DFSdeepClone(bool);
var boolCopy1 = BFSdeepClone(bool);
console.log(boolCopy, boolCopy1); //false false 测试通过
// 输入 null
// 预期输出 null
let nul = null;
var nulCopy = DFSdeepClone(nul);
var nulCopy1 = BFSdeepClone(nul);
console.log(nulCopy, nulCopy1); //null null 测试通过

// 输入undefined
// 预期输出undefined
let und = undefined;
var undCopy = DFSdeepClone(und);
var undCopy1 = BFSdeepClone(und);
console.log(undCopy, undCopy1); //undefined undefined 测试通过
//输入引用类型obj
let obj = {
	a: 1,
	b: () => console.log(1),
	c: {
		d: 3,
		e: 4,
	},
	f: [1, 2],
	und: undefined,
	nul: null,
};
var objCopy = DFSdeepClone(obj);
var objCopy1 = BFSdeepClone(obj);
console.log(objCopy === objCopy1); // 对象类型判断 false 测试通过
console.log(obj.c === objCopy.c); // 对象类型判断 false 测试通过
console.log(obj.c === objCopy1.c); // 对象类型判断 false 测试通过
console.log(obj.b === objCopy1.b); // 函数类型判断 false 测试通过
console.log(obj.b === objCopy.b); // 函数类型判断 false 测试通过
console.log(obj.f === objCopy.f); // 数组类型判断 false 测试通过
console.log(obj.f === objCopy1.f); // 数组类型判断 false 测试通过
console.log(obj.nul, obj.und); // 输出null，undefined 测试通过

// 输入环状数据
// 预期不爆栈且深度复制
let circleObj = {
	foo: {
		name: function () {
			console.log(1);
		},
		bar: {
			name: 'bar',
			baz: {
				name: 'baz',
				aChild: null, //待会让它指向obj.foo
			},
		},
	},
};
circleObj.foo.bar.baz.aChild = circleObj.foo;
var circleObjCopy = DFSdeepClone(circleObj);
var circleObjCopy1 = BFSdeepClone(circleObj);
console.log(circleObjCopy, circleObjCopy1); // 测试通过?
