function* eachline(s = '') {
	let p;
	while ((p = s.indexOf('\n')) != -1) {
		yield s.substring(0, p);
		s = s.substring(p + 1);
	}
	if (s.length > 0) yield s;
}

function* map(i, f) {
	for (let x of i) yield f(x);
}

function* select(i, f) {
	for (let x of i) {
		if (f(x)) yield x;
	}
}

let text = ' #comment \n \n hello \nworld\n quit \n unreached \n';

let lines = eachline(text);

let trimmed = map(lines, function (lines) {
	return lines.trim();
});

let nonblank = select(trimmed, function (line) {
	return line.length > 0 && line[0] != '#';
});

for (let line of nonblank) {
	if (line === 'quit') break;
	console.log(line);
}
// hello world
