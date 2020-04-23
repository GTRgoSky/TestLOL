function int2StringReverse(num) {
	let _num = num.toString();
	if (_num === '') return;
	let arr = [];
	arr.unshift(_num.slice(0, 1));
	if (_str !== '') {
		let _str = _num.slice(1, _num.length);
		arr.unshift(int2StringReverse(parseInt(_str)));
	}
	return arr.join('');
}
var a = int2StringReverse(75698);
console.log(a, typeof a);
