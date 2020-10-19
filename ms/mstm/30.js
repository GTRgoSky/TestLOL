function getNext(desc) {
	let arr = [];
	let k = 0;
	let len = desc.length;
	for (let i = 0; i < len; i++) {
		if (i == 0) {
			arr.push(0);
			continue;
		}
		if (k > 0 && desc[k] != desc[i]) {
			k = arr[k - 1];
		}
		if (desc[k] == desc[i]) k++;
		arr[i] = k;
	}
	return arr;
}

function getStrIndex(str, desc) {
	let next = getNext(desc);
	let len1 = str.length,
		len2 = desc.length;
	let i = 0,
		j = 0;
	while (i < len1 && j < len2) {
		if (str[i] == desc[j]) {
			i++;
			j++;
		} else {
			j = 0;
			i = i - next[j] + 1;
		}
	}

	if (j == len2) return i - j;
	return -1;
}

console.log(getStrIndex('tesaabtaabbcc', 'aab'));
