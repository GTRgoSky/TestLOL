// 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id
let list = [
	{
		id: 1,
		children: [
			{
				id: 2,
				children: [
					{
						id: 4,
					},
					{
						id: 112,
						children: [
							{
								id: 113,
							},
						],
					},
				],
			},
			{
				id: 3,
				children: [
					{
						id: 6,
					},
					{
						id: 7,
						children: [
							{
								id: 115,
							},
						],
					},
				],
			},
		],
	},
];

function p(data, key) {
	let arr = [];
	function _m(_arr, _key) {
		let _saveL = [];
		let _index = null;
		let _s = _arr.find((el, index) => {
			if (el.children) {
				el.children.forEach((element) => {
					element.parentid = index;
				});
				_saveL.push(...el.children);
			}
			if (el.id == _key) {
				_index = index;
				return true;
			}
		});
		if (!_s) {
			let obj = _m(_saveL, key);
			arr.unshift(_arr[obj].id);
			return _arr[obj].parentid;
		}
		arr.push(_s.id);
		return _s.parentid;
	}
	_m(data, key);
	return arr;
}

let a = p(list, '115');
console.log(a);
