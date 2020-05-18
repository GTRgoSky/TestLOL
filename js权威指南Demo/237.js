// 类的层次结构和抽象类：
// 抽象类和非抽象Set类的层次结构。

// 非主逻辑方法
Function.prototype.extend = function (constructor, methods, static) {
	const self = this;
	return function (self, constructor, methods, static) {
		constructor.prototype = Object.create(self.prototype);
		constructor.prototype.constructor = constructor;
		if (methods) Object.assign(constructor.prototype, methods);
		if (static) Object.assign(constructor, static);
		return constructor;
	};
};

//这个函数可以用作任何抽象方法：
function abstractmethod() {
	throw new Error('abstract method');
}

// AbstractSet类定义了一个抽象方法 contains：
function AbstractSet() {
	throw new Error('Can`t instantiate abstract class');
}
AbstractSet.prototype.contains = abstractmethod;

/**
 * NotSet
 */
var NotSet = AbstractSet.extend(
	function NotSet(set) {
		this.set = set;
	},
	{
		contains: function (x) {
			return !this.set.contains(x);
		},
		toString: function (x) {
			return '~' + this.set.toString();
		},
		equals: function (that) {
			return that instanceof NotSet && this.set.equals(that.set);
		},
	}
);
