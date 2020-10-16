let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function shuffle(arr) {
	let len = arr.length;
	for (let i = 0; i < len; i++) {
		let idx = Math.floor(Math.random() * (len - 1));
		[arr[len - 1 - i], arr[idx]] = [arr[idx], arr[len - 1 - i]];
	}
	return arr;
}
