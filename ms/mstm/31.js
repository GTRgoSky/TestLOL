function s2i(s) {
	return s
		.split('')
		.reduce(function (a, c) {
			var code = c.charCodeAt(0);
			if (48 <= code && code < 58) {
				a.push(code - 48);
			}
			return a;
		}, [])
		.reduce(function (a, c) {
			return 10 * a + c;
		}, 0);
}

function versionCmp(s1, s2) {
	var a = s1.split('.').map(function (s) {
		return s2i(s);
	});
	var b = s2.split('.').map(function (s) {
		return s2i(s);
	});
	var n = a.length < b.length ? a.length : b.length;
	for (var i = 0; i < n; i++) {
		if (a[i] < b[i]) {
			return -1;
		} else if (a[i] > b[i]) {
			return 1;
		}
	}
	if (a.length < b.length) return -1;
	if (a.length > b.length) return 1;
	var last1 = s1.charCodeAt(s1.length - 1) | 0x20,
		last2 = s2.charCodeAt(s2.length - 1) | 0x20;
	return last1 > last2 ? 1 : last1 < last2 ? -1 : 0;
}

console.log(versionCmp('v1.1.1', 'v1.10.9'));
