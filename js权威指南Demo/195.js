// 手动实现map

Array.prototype.map = Array.prototype.map
	? Array.prototype.map
	: function (fun) {
			var self = this;
			let arr = [];
			for (let i = 0; i < self.length; i++) {
				arr.push(fun.call(null, self[i], i, self));
			}
			return arr;
	  };

var a = [1, 2, 3, 4];
var b = a.map((el) => {
	console.log(el);
	return el;
});
console.log(b);

console.log('****----分割线----****');

// 手动实现reduce
Array.prototype.reduce = Array.prototype.reduce
	? Array.prototype.reduce
	: function (fun) {
			var self = this;
			if (self.length == 0) throw 'arguments is not allow empty';
			if (!Array.isArray(self)) throw 'arguments must be Array';
			var i = 0,
				initial,
				length = arguments.length;
			if (length > 1) {
				initial = arguments[1];
			} else {
				initial = self[0];
				i++;
			}
			while (i < self.length) {
				initial = fun.call(null, initial, self[i], i, self);
				i++;
			}
			return initial;
	  };

var c = [1, 2, 3, 4];
var d = c.reduce(function (x, y, index, self) {
	console.log(x, y, index, self);
	return x + y;
});
console.log(d);
