function dupicatedWord(arr) {
	let obj = {};
	arr.map((el) => (obj[el] = obj[el] !== undefined));
	return obj;
}

var a = dupicatedWord(['a', 'b', 'c', 'a', 'd', 'c']);

console.log(a);
