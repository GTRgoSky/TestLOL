import { Dep } from './observer.js';

// 实例， 当前绑定的对象key路径， 回调
function Watcher(vm, expOrFn, cb) {
	this.cb = cb; //绑定dom更新回调
	this.vm = vm; // 绑定当前vue实例
	this.expOrFn = expOrFn; // 绑定对应exp路径
	this.depIds = {}; //存储dep的id

	if (typeof expOrFn === 'function') {
		this.getter = expOrFn;
	} else {
		// 获取闭包函=>获取传入参数中对应exp路径的值
		this.getter = this.parseGetter(expOrFn);
	}
	// 保存当前value值，同时将watcher和对应data的dep绑定，同时也完成了dep中push相应watcher的策略
	this.value = this.get();
}

Watcher.prototype = {
	update: function () {
		this.run();
	},
	run: function () {
		var value = this.get(); //获取最新data值
		var oldVal = this.value; // 获取之前watcher保存的值
		//如果值没有变更直接返回不在进行任何操作
		if (value !== oldVal) {
			this.value = value; //更新旧值
			// 这个回调触发dom更新方法更新新值
			this.cb.call(this.vm, value, oldVal); //this.vm是实例对象，触发watch的回调
		}
	},
	addDep: function (dep) {
		//  当前exp是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
		if (!this.depIds.hasOwnProperty(dep.id)) {
			dep.addSub(this);
			this.depIds[dep.id] = dep;
		}
	},
	get: function () {
		// 将Dep类的.target 赋于当前Watcher实例
		// 作用是让dep调用一下addDep方法，将watcher绑定下对应data的dep
		Dep.target = this;
		// vm 是 vue当前实例
		// 获取到了当前 vm._data中exp路径下的的值
		// 触发了 observe中的get劫持
		// 从而触发addDep
		var value = this.getter.call(this.vm, this.vm); //this.vm将data抛出了option，直接在vm对象上挂载
		// 完成使命就清空
		Dep.target = null;
		// 返回对应data的值
		return value;
		//初次渲染这个方法为了调取一次watch用于将实例化的watch放入dep，同时保存oldVal用于和新值比对
		//二次渲染为了取得新值
	},

	parseGetter: function (exp) {
		// 匹配非ASCII和以回车为结尾的字段
		if (/[^\w.$]/.test(exp)) return;

		var exps = exp.split('.');

		// 返回一个 function , 传入一个obj，返回obj[exps]的最终路径[exps = a.b => return obj.a.b];
		// 最终返回的是基本类型
		// obj 是vue的实例
		return function (obj) {
			for (var i = 0, len = exps.length; i < len; i++) {
				if (!obj) return;
				obj = obj[exps[i]]; //此处是个取值操作会触发defineProperty绑定的get方法
			}
			return obj;
		};
	},
};

exports.Watcher = Watcher;
