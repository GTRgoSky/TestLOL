'use strict';

require('./a.js');

require('./b.js');

var _mod = require('./mod3.js');

var _mod2 = _interopRequireDefault(_mod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requiteObj = require('./require.js');
console.log(_mod2.default, 3);
console.log(requiteObj, 4);