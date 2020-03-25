// 如何实现一个 new
var Dog = function(name) {
	this.name = name;
};
Dog.prototype.bark = function() {
	console.log('wangwang');
};
Dog.prototype.sayName = function() {
	console.log('my name is ' + this.name);
};
function _new(fn, ...arg) {
	const obj = Object.create(fn.prototype);
	const ret = fn.apply(obj, arg);
	return ret instanceof Object ? ret : obj;
}

var dog = _new(Dog, 'simao');
dog.sayName();
dog.bark();
