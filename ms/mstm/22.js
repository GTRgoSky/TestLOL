// 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

// function convert(arr = []) {
// 	let initObj = {};
// 	arr.map((el) => {
// 		if (initObj[el.parentId]) {
// 			initObj[el.parentId].push(el);
// 		} else {
// 			initObj[el.parentId] = [el];
// 		}
// 	});
// 	function _co(_saveArr) {
// 		if (!_saveArr) return [];
// 		_saveArr = _saveArr.map((el) => {
// 			el.children = _co(initObj[el.id]);
// 			return el;
// 		});
// 		return _saveArr;
// 	}
// 	var a = _co(initObj[0]);
// 	console.log(a);
// 	return a;
// }

// let list = [
// 	{ id: 1, name: '部门A', parentId: 0 },
// 	{ id: 2, name: '部门B', parentId: 0 },
// 	{ id: 3, name: '部门C', parentId: 1 },
// 	{ id: 4, name: '部门D', parentId: 1 },
// 	{ id: 5, name: '部门E', parentId: 2 },
// 	{ id: 6, name: '部门F', parentId: 3 },
// 	{ id: 7, name: '部门G', parentId: 2 },
// 	{ id: 8, name: '部门H', parentId: 4 },
// ];

// convert(list);

// const map = list.reduce((res, v) => ((res[v.id] = v), res), {});
// console.log(map);

function covert(arr) {
	let obj = {};
	arr.map((el) => {
		if (obj[el.parentId]) {
			obj[el.parentId].push(el);
		} else {
			obj[el.parentId] = [el];
		}
	});

	function _co(_objList) {
		if (!_objList) return [];
		return _objList.map((el) => {
			el.children = _co(obj[el.id]);
			return el;
		});
	}

	return _co(obj['root'])[0];
}

let list = [
	{ id: 0, name: '根', parentId: 'root' },
	{ id: 1, name: '部门A', parentId: 0 },
	{ id: 2, name: '部门B', parentId: 0 },
	{ id: 3, name: '部门C', parentId: 1 },
	{ id: 4, name: '部门D', parentId: 1 },
	{ id: 5, name: '部门E', parentId: 2 },
	{ id: 6, name: '部门F', parentId: 3 },
	{ id: 7, name: '部门G', parentId: 2 },
	{ id: 8, name: '部门H', parentId: 4 },
];

let _list = covert(list);

console.log(_list);
