// common.js实现import
var testB = null;
testB = 444;
var obj = {
	test: null
};
obj.test = 555;
module.exports = {
	obj: obj,
	testB: testB
};
obj.test = 666;
testB = 333;
