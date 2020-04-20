// 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
// 你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。
function t(arr, t) {
	if (arr.length < 2) throw new Error('数组长度需要大于2');
	function _t(arr, t, s = 0, em = []) {
		let _arr = [...arr];
		let n = _arr[s];
		let _em = [...em];
		if (s > _arr.length - 1) return _em;
		if (isNaN(n)) {
			s++;
			return _t(_arr, t, s, _em);
		}
		for (let i = s + 1; i < _arr.length; i++) {
			let is = _arr[i];
			if (is + n == t) {
				_em.push(s, i);
				_arr.splice(s, 1, undefined);
				_arr.splice(i, 1, undefined);
				break;
			}
		}
		s++;
		return _t(_arr, t, s, _em);
	}
	return _t(arr, t, 0, []);
}

console.log(t([2, 7, 11, 15, 1, 8, 2, 7, 2, 9, 0], 9));
