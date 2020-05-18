// 1Observer构造函数
// 初始化时data就是new Vue({data:function(){return {} }})这个返回的值
// 递归时，data是一级data的属性对应的object {a:{}}// data就是这个a:{}我们下文成为datachild
function Observer(data) {
	this.data = data; // 2绑定的数据
	this.walk(data); // 3初始化执行监听
}

// 原型增加方法
Observer.prototype = {
	constructor: Observer,
	walk: function (data) {
		var me = this;
		// 4遍历每个属性增加监听
		Object.keys(data).forEach(function (key) {
			me.convert(key, data[key]);
		});
	},
	convert: function (key, val) {
		// 5绑定的数据，key，值
		this.defineReactive(this.data, key, val);
	},

	defineReactive: function (data, key, val) {
		// 6 初始化时实例化Dep();
		// 12 递归子属性
		// dep = {id: 递归的次数, subs: []}
		var dep = new Dep();

		// 9 验证data属性的val
		var childObj = observe(val);

		// 13 执行数据劫持
		Object.defineProperty(data, key, {
			enumerable: true, // 可枚举
			configurable: false, // 不能再配置
			// 14需要获取被监听的值时
			get: function () {
				if (Dep.target) {
					dep.depend();
				}
				return val;
			},
			// 15 设置被监听的值时
			set: function (newVal) {
				// 16 设置时如果 新老值相等则不操作，若不等则替换值
				if (newVal === val) {
					return;
				}
				val = newVal; //此时，data上的值已经进行了更新，剩下的就是找到对应DOM进行更新
				// 17 如果newValue是个对象，则递归去绑定新的劫持
				// 如果 val 是一个 {}, 而直接用 val.xxx = {}去赋值，则无法监听到劫持。因为没有给xxx绑定劫持
				// 只能 val = {xxx: ???} 才能劫持，同时也创建了新的xxx劫持
				childObj = observe(newVal);
				// 通知订阅者
				dep.notify();
			},
		});
	},
};

function observe(value, vm) {
	// 10 如果不是引用类型（非object）则直接返回
	if (!value || typeof value !== 'object') {
		return;
	}

	// 11 如果是object类型 则递归实例化 Observer，此时data变成
	return new Observer(value);
}

var uid = 0;

// 7 声明Dep构造函数
function Dep() {
	// id记录了实例化Dep的次数
	this.id = uid++; //data对象里每一个子对象都会创建对应id，防止重复添加watcher
	this.subs = []; //里面存储的都是实例化的watch
}

// 8 给Dep添加原型方法
Dep.prototype = {
	constructor: Dep,
	addSub: function (sub) {
		// 将该data劫持对应的watcher实例保存在数组
		this.subs.push(sub); //将watch实例放入数组
	},

	depend: function () {
		// 将depId存入watcher
		Dep.target.addDep(this);
	},

	removeSub: function (sub) {
		var index = this.subs.indexOf(sub);
		if (index != -1) {
			this.subs.splice(index, 1);
		}
	},

	notify: function () {
		// 当对应data更新，循环watcher实例更新dem
		this.subs.forEach(function (sub) {
			sub.update(); //订阅者执行watch上的方法
		});
	},
};

Dep.target = null;

module.exports = {
	Dep: Dep,

	observe: observe,
};
