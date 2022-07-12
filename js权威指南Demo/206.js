function a() {}
function b(x, y) {
	this.x = x;
	this.y = y;
}
var obj = {
	con() {
		console.log(this.x, this.y);
	},
};

// 并不能修改构造函数
// a.prototype = {
// 	constructor: b,
// 	...obj,
// };
b.prototype = {
	constructor: b,
	...obj,
};
// var c = new b(1, 2);
// c.con();

// 组合继承的缺点测试
// function d() {
// 	b.apply(this, arguments);
// }
// d.prototype = new b();
// var dvm = new d();
// console.log(d.prototype.constructor);

// 寄生式继承
/**
 *
 * @param {Objcet} Child //子类
 * @param {Object} Parent //父类
 */
function extend(Child, Parent) {
	function content(obj) {
		function F() {} // 声明一个构造函数
		F.prototype = obj; // Parent.prototype //将构造函数的原型对象指向obj=parent的实例
		F.prototype.constructor = F; // 且构造函数指向自己
		return new F(); // 返回F的实例用于作为子类的原型对象
	}
	

	let p = content(Parent.prototype); // 将父类的原型对象传入，得到指向父类原型对象的实例
	// let p = content(new Parent()); // 如果传入的是实例，则会多一层__prop__。因为实例的__prop__才是真正的指向原型对象
	// 将子类指向实例p，注意这块如果用解构赋值，则其实是p.__proto__指向Parent的原型对象
	// 引出 实例的__proto__指向原型对象
	Child.prototype = p;
	// Child.prototype = Object.create(Parent.prototype) 上面的全都不要了
	Child.prototype.constructor = Child;

	return Child;
}

function e(x, y) {
	this.a = x + 1;
	this.b = y + 1;
}
// var evm1 = new e(1, 2);
// console.log(evm1);

extend(e, b);
var evm2 = new e(3, 4);
console.log(evm2);
evm2.con();

// Object.getPrototypeOf(obj) == obj.__proto__
Object.getPrototypeOf =
	Object.getPrototypeOf ||
	function (obj) {
		return obj.__proto__;
	};

// 写法1；
function superFun(/** 第一位为一个子类构造函数的this，后面拼接参数 */) {
	let arr = Array.from(arguments);
	let selfObj = arr.shift(); // 获取构造函数的实例
	let vm = selfObj.__proto__; // 获取构造函数的原型对象
	// 因为获取的是原型对象其实是父类的实例，所以 用__proto__获取真正的原型对象。
	let fun = vm.__proto__.constructor; // 获取父类的构造函数
	fun.apply(selfObj, arr);
}
// 写法2:
function superFun2(/** 第一位为一个子类构造函数的this，后面拼接参数 */) {
	let arr = Array.from(arguments);
	let selfObj = arr.shift();
	let vm = Object.getPrototypeOf(selfObj);
	let fun = Object.getPrototypeOf(vm).constructor;
	fun.apply(selfObj, arr);
}

function f(x, y) {
	this.a = x + 1;
	this.b = y + 1;
	superFun2(this, x, y);
}
extend(f, b);
var fvm2 = new f(3, 4);
console.log(fvm2);
fvm2.con();



// 随便写写 Object.create

function Parent() {}

function Child() {
	Parent.call(this);
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

