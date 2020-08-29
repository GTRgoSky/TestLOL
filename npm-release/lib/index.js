let timeFormat = require('../src/time');
let htmlStr = require('../src/stroperation');

let obj = Object.assign({}, timeFormat, htmlStr);
let exportsObj = {};

for (let [key, value] of Object.entries(obj)) {
	exportsObj[key] = value;
}
module.exports = exportsObj;
