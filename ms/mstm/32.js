function getTimeString(date = new Date()) {
	var start = new Date(date);
	//new Date(1,0,1)这三个参数是年月天
	var end = new Date(start.getFullYear() + 1, 0, 1);

	var elapse = Math.floor((end - start) / 1000); // 取共有秒

	var seconds = elapse % 60;
	var minutes = Math.floor(elapse / 60) % 60;
	var hours = Math.floor(elapse / (60 * 60)) % 24;
	var days = Math.floor(elapse / (60 * 60 * 24)) % 30;
	var months = Math.floor(elapse / (60 * 60 * 24 * 30)) % 12;
	var years = Math.floor(elapse / (60 * 60 * 24 * 30 * 12));

	return (
		start.getFullYear() +
		'年还剩' +
		years +
		'年' +
		months +
		'月' +
		days +
		'日' +
		hours +
		'小时' +
		minutes +
		'分' +
		seconds +
		'秒'
	);
}

getTimeString();

console.log(getTimeString());
