import { observe } from './observer.js';
import { Compile } from './compile.js';

function MVVM(options) {
	// VUE所有的传入属性（options）都绑定在 $options上
	this.$options = options;
	var data = (this._data = this.$options.data), // 将data，_data和$option.data全部指向一个地址对象，共享劫持
		me = this;
	// 属性代理，实现 vm.xxx -> vm._data.xxx
	Object.keys(data).forEach(function (key) {
		// 将data 属性 全绑定在vue实例上（拷贝了一份）
		me._proxy(key);
	});
	observe(data, this);
	this.$compile = new Compile(options.el || document.body, this); //（el: '#mvvm-app'）
}

MVVM.prototype = {
	_proxy: function (key) {
		var me = this;
		Object.defineProperty(me, key, {
			configurable: false,
			enumerable: true,
			// 每次data更新或获取必会先触发这个引发_data变更导致observe监听劫持
			// 因为 ：this.a.b变更，this.a就会触发proxyGetter，然后获取this._data.a,触发observe劫持，
			// 返回this._data.a的值，获取this._data.a.b触发this._data.a.b劫持.
			get: function proxyGetter() {
				// 当获取this._data时又触发了observe中已经做了数据劫持的get
				return me._data[key];
			},
			set: function proxySetter(newVal) {
				// 当修改this.[data]的值时，先触发这个，导致修改了this._data指向的对象。
				// 指向的对象在observe中已经做了数据劫持
				me._data[key] = newVal; //开发者修改data值后的入口
			},
		});
	},
};

module.exports = MVVM;
