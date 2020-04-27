'use strict';

var extend = function () {
	return function extend(o) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var prop in source) {
				o[prop] = source[prop];
			}
		}
		return o;
	};
};

var a = extend();

console.log(a({ a: 1 }, { b: 2 }, { a: 2 }));
