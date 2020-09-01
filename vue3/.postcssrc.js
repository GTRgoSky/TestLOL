// https://juejin.im/post/6844903718110887949
const path = require('path');
module.exports = {
	map: false,
	plugins: {
		'postcss-assets': {
			loadPaths: [path.resolve(__dirname, 'src/assets')],
			relative: true,
		},
		'postcss-px2rem': {
			remUnit: 20,
		},
	},
};
