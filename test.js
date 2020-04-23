function a() {
	var a = 1;
	return function () {
		console.log(a);
		a++;
	};
}

var b = a();

for (let i = 0; i < 3; i++) {
	b && b();
}
