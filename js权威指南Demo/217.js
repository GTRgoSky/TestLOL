function Set() {
	//一个构造函数 -- 让每一个不同的值都一个唯一字符串对应
	this.values = {}; //集合数据保存在对象的属性里
	this.n = 0; // 集合中值的个数
	this.add.apply(this, arguments); //把所有参数添加到这个集合
}

//将每个参数都添加至集合中
Set.prototype.add = function () {
	for (var i = 0; i < arguments.length; i++) {
		//遍历每个参数
		var val = arguments[i]; //待添加到集合中的值
		var str = Set._v2s(val); //把它转换为唯一字符串
		if (!this.values.hasOwnProperty(str)) {
			// 如果不在集合中
			this.values[str] = val; //将字符串和值对应起来
			this.n++; // 计数器加1
		}
	}
	return this;
};

// 从集合删除元素，这些元素由参数决定
Set.prototype.remove = function () {
	for (var i = 0; i < arguments.length; i++) {
		//遍历每个参数
		var str = Set._v2s(arguments[i]); // 将字符串和值对应
		if (this.values.hasOwnProperty(str)) {
			//如果在集合中
			delete this.values[str]; // 删除
			this.n--; // 计数器减1
		}
	}
	return this;
};

// 如果集合包含这个值。返回true 否则返回 false
Set.prototype.contains = function (value) {
	return this.values.hasOwnProperty(Set._v2s(value));
};

// 返回集合大小
Set.prototype.size = function () {
	return this.n;
};

// 遍历集合中的所有元素，在指定的上下文中调用f
Set.prototype.foreach = function (f, context) {
	for (var s in this.values) {
		// 遍历集合中的所有字符串
		if (this.values.hasOwnProperty(s)) {
			// 忽略继承属性
			f.call(context, this.values[s]); // 调用f，传入value，上下文指向context
		}
	}
};

//判断that是否和调用他的对象相等
Set.prototype.equals = function (that) {
	if (this === that) return true;

	if (!(that instanceof Set)) return false;

	if (that.size() != this.size()) return false;

	try {
		this.foreach(function (v) {
			if (!that.contains(v)) throw false;
		});
		return true;
	} catch (e) {
		if (e == false) return false;
		throw e;
	}
};

// 这是一个内部函数，用来将任意的Javascript值和唯一的字符串对应起来
Set._v2s = function (val) {
	switch (val) {
		case undefined: //特殊的原始值，值只返回一个字母
			return 'u';
		case null:
			return 'n';
		case true:
			return 't';
		case false:
			return 'f';
		default:
			switch (typeof val) {
				case 'number':
					return '#' + val;
				case 'string':
					return '"' + val;
				default:
					return '@' + objectId(val);
			}
	}

	/**
	 * 对任意对象来说，都会返回一个字符串
	 * 针对不同的对象，这个函数会返回不同的字符串
	 * 对于同一个对象的多次调用，总是返回相同的字符串
	 * 为了做到这一点，它给o创建了一个属性。在ES5中，这个属性是不可枚举且是只读的
	 */
	function objectId(o) {
		var prop = '|**objectid**|'; //私有属性用于存放id
		if (!o.hasOwnProperty(prop)) {
			//如果对象没有id
			o[prop] = Set._v2s.next++; //将下一个值赋予它
		}
		return o[prop]; //返回id
	}
};

Set._v2s.next = 100; //设置初始的id值

var b = function (v) {
	console.log(v);
};
var a = new Set(
	{},
	{},
	function a() {},
	function a() {},
	b,
	b,
	null,
	null,
	[1, 2, 2, 3]
);

/**
 * {
 *  n: 6,
 *  valuse: {
 *      @100:{},
 *      @101: {},
 *      @102: function a(){},
 *      @103: function a(){},
 *      @104: function() {},
 *      'n': null,
 *      @105: [1,2,2,3]
 *  }
 * }
 *
 * b['|**objectid**|'] = 104
 */
console.log(a);

var c = {
	a: 1,
	b: 2,
};
a.foreach(function (v) {
	if (typeof v == 'function' && v.name == 'b') {
		v(this.a);
	}
}, c);

console.log(this);
