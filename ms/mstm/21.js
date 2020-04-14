// 在输入框中如何判断输入的是一个正确的网址
function isUrl(url) {
	const a = document.createElement('a');
	a.href = url;
	return (
		[
			/^(http|https):$/.test(a.protocol),
			a.host,
			a.pathname !== url,
			a.pathname !== `/${url}`,
		].find((x) => !x) === undefined
	);
}
