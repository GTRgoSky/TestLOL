function filterSensitiveWord(_str, arr) {
	let str = '(' + arr.join('|') + ')';
	let rgx = new RegExp(str, 'g');
	/**
	 * match 匹配的子串
	 * p1 匹配的第一个（）
	 * offset 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1）
	 * string 被匹配的原始字符
	 */
	_str = _str.replace(rgx, function (match, p1, offset, string) {
		return '*'.repeat(p1.length);
	});
	return _str;
}

var a = filterSensitiveWord('想要轻生，have sex,sexy,babe', ['轻生', 'sex']);

console.log(a);
