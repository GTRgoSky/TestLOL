// 200 记忆函数
function memorize(f) {
	var cache = {};
	return function () {
		var key = arguments.length + Array.prototype.join.call(arguments, ',');
		console.log(cache);
		if (key in cache) return cache[key];
		return (cache[key] = f.apply(this, arguments));
	};
}

// 最大公约数
function gcd(a, b) {
	var t;
	if (a < b) (t = b), (b = a), (a = t);
	while (b != 0) (t = b), (b = a % b), (a = t);
	return a;
}

var gcdmemo = memorize(gcd);

// console.log(gcdmemo(85, 187), gcdmemo(16, 32));

var factorial = memorize(function (n) {
	return n <= 1 ? 1 : n * factorial(n - 1);
});

console.log(factorial(5), factorial(4));
