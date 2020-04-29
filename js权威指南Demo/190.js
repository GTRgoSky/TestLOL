function trace(o, m) {
	var sf = o[m];
	o[m] = function () {
		console.log('start', m);
		var res = sf.apply(this, arguments);
		console.log('end');
		return res;
	};
}
var t = {
	a: (res) => {
		console.log(res);
	},
};
trace(t, 'a');
t.a(1);
trace(t, 'a');
t.a(4);
