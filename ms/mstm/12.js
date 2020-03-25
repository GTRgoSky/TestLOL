//Promise
const sleep1 = time => {
	return new Promise(resolve => setTimeout(resolve, time));
};
sleep1(1000).then(() => {
	console.log(1);
});

//Generator
function* sleepGenerator(time) {
	yield new Promise(function(resolve, reject) {
		setTimeout(resolve, time);
	});
}
sleepGenerator(1000)
	.next()
	.value.then(() => {
		console.log(1);
	});

//async
function sleep2(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}
async function output() {
	let out = await sleep2(1000);
	console.log(1);
	return out;
}
output();

//ES5
function sleep3(callback, time) {
	if (typeof callback === 'function') setTimeout(callback, time);
}

function output() {
	console.log(1);
}
sleep3(output, 1000);
