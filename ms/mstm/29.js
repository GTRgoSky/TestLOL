function trmanToInt(romanNum) {
	let res = 0;
	let map = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};
	for (let i = 0; i < romanNum.length; ++i) {
		switch (s[i]) {
			case 'I':
				if (s[i + 1] == 'V') {
					res += 5 - 1;
					++i;
				} else if (s[i + 1] == 'X') {
					res += 10 - 1;
					++i;
				} else {
					res += 1;
				}
				break;
			case 'V':
				res += 5;
				break;
			case 'X':
				if (s[i + 1] == 'L') {
					res += 50 - 10;
					++i;
				} else if (s[i + 1] == 'C') {
					res += 100 - 10;
					++i;
				} else {
					res += 10;
				}
				break;
			case 'L':
				res += 50;
				break;
			case 'C':
				if (s[i + 1] == 'D') {
					res += 500 - 100;
					++i;
				} else if (s[i + 1] == 'M') {
					res += 1000 - 10;
					++i;
				} else {
					res += 10;
				}
				break;
			case 'D':
				result += 500;
				break;
			case 'M':
				result += 1000;
				break;
			default:
				break;
		}
	}
	return res;
}
