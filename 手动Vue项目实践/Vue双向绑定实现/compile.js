import { Watcher } from './watcher.js';

function Compile(el, vm) {
	// 1 el是dom的选择器属性用宇获取 dom； vm是mvvm（Vue）的实例
	this.$vm = vm;
	// 判断el的属性 如果是 Element 则直接使用， 否则获取对应DOM
	this.$el = this.isElementNode(el) ? el : document.querySelector(el); //初始化el:#mvvm-app,$el为此id的dom

	// 如果dom获取并存在
	if (this.$el) {
		// 将主DOM下的所有子节点都存在$fragment集合下
		this.$fragment = this.node2Fragment(this.$el); //$fragment存储(拷贝)了el的所有节点，复制了$el的DOM
		// 初始化
		this.init();
		this.$el.appendChild(this.$fragment);
	}
}

Compile.prototype = {
	node2Fragment: function (el) {
		var fragment = document.createDocumentFragment(),
			child;

		// 将原生节点拷贝到fragment
		while ((child = el.firstChild)) {
			// 提取dom中的el.firstChild；
			// fragment.appendChild 后原dom会删除firstChild；
			// 因此这个循环是依次将主dom下的节点全部添加到 fragment
			fragment.appendChild(child);
		}

		return fragment;
	},

	init: function () {
		this.compileElement(this.$fragment);
	},

	compileElement: function (el) {
		// el 主DOM的节点片段集合
		var childNodes = el.childNodes,
			me = this;

		//类数组转换
		[].slice.call(childNodes).forEach(function (node) {
			// 每个子节点
			var text = node.textContent;
			var reg = /\{\{(.*)\}\}/; //匹配{{}}格式的文本

			// 如果是Element
			if (me.isElementNode(node)) {
				me.compile(node);
			} else if (me.isTextNode(node) && reg.test(text)) {
				me.compileText(node, RegExp.$1);
			}

			if (node.childNodes && node.childNodes.length) {
				me.compileElement(node);
			}
		});
	},

	compile: function (node) {
		var nodeAttrs = node.attributes, // 获取node 标签属性
			me = this;

		// 获取每个节点的属性
		[].slice.call(nodeAttrs).forEach(function (attr) {
			var attrName = attr.name;
			// 判断属性上是否有v-开头的标签
			if (me.isDirective(attrName)) {
				var exp = attr.value; // 获取这个value
				var dir = attrName.substring(2); // 截取属性前两位(v-)获取后面的值
				// 事件指令 判断是否是v-on
				if (me.isEventDirective(dir)) {
					// 传入当前 子dom， vue实例，属性的value（方法名），属性(on:name)(无v-)
					compileUtil.eventHandler(node, me.$vm, exp, dir);
					// 普通指令
				} else {
					// 如果不是v-on:
					// 匹配对应 compileUtil 的属性
					compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
				}

				node.removeAttribute(attrName);
			}
		});
	},

	compileText: function (node, exp) {
		compileUtil.text(node, this.$vm, exp);
	},

	isDirective: function (attr) {
		return attr.indexOf('v-') == 0;
	},

	isEventDirective: function (dir) {
		return dir.indexOf('on') === 0;
	},

	/**
	 *
	 * @param {*} nodeType
	 *  1、元素Element
	 *  2、Attr
	 *  3、Text 文本属性
	 *  8、Comment 注释
	 *  9、Document
	 *  11、 DocumentFragment
	 */
	isElementNode: function (node) {
		console.log(node);
		return node.nodeType == 1;
	},

	isTextNode: function (node) {
		return node.nodeType == 3;
	},
};

// 指令工具集合
// _代表私有方法
var compileUtil = {
	text: function (node, vm, exp) {
		this.bind(node, vm, exp, 'text');
	},

	// v-html调用绑定innerHTML得操作
	html: function (node, vm, exp) {
		this.bind(node, vm, exp, 'html');
	},

	// v-model时调用，在input时监听input事件并执行设置新值得操作
	model: function (node, vm, exp) {
		this.bind(node, vm, exp, 'model');

		var me = this,
			val = this._getVMVal(vm, exp); // 获取老data值
		// 监听input事件
		node.addEventListener('input', function (e) {
			var newValue = e.target.value;
			if (val === newValue) {
				return;
			}

			me._setVMVal(vm, exp, newValue);
			val = newValue;
		});
	},

	class: function (node, vm, exp) {
		this.bind(node, vm, exp, 'class');
	},

	// 将当前对应的对象值（vm.exp）赋给相应dom
	// node , 实例, 当前dom属性的value, 传入定值
	bind: function (node, vm, exp, dir) {
		// 获取 updater的对应方法 待用
		var updaterFn = updater[dir + 'Updater'];

		// 如果存在方法，初始化绑定一次值。 当前dom，对应绑定得data得key
		updaterFn && updaterFn(node, this._getVMVal(vm, exp)); //将值渲染在对应DOM中

		//实例化Watcher，每个被初始化过的指令都会有自己的实例
		new Watcher(vm, exp, function (value, oldValue) {
			// 形成闭包，长期存有更新dom的方法
			updaterFn && updaterFn(node, value, oldValue); //这个回调目的是为了更新DOM
		});
	},

	// 为dom添加事件监听得操作
	// 接受 传入的dom， vue实例，当前dom属性的value（方法名），当前属性(on:name)
	eventHandler: function (node, vm, exp, dir) {
		var eventType = dir.split(':')[1], // 单独获取name[一般是click]
			fn = vm.$options.methods && vm.$options.methods[exp]; // 查找methods中对应的方法

		// 如果name 和function都存在
		if (eventType && fn) {
			// 用这个name 做一个监听， 执行绑定的方法，this指向当前vue实例
			// 触发后执行vue实例中的methods对应方法
			node.addEventListener(eventType, fn.bind(vm), false);
		}
	},

	// vue 实例 ， 当前dom属性的value
	// 获取data值得操作
	_getVMVal: function (vm, exp) {
		var val = vm;
		exp = exp.split('.');
		exp.forEach(function (k) {
			// val[k]会触发mvvm里面的get劫持，从而触发observe中的数据劫持
			// 非实例上的字段只会触发observe中的数据劫持
			// 因为第一次返回的是从mvvm劫持来的_data上的对象，这个对象一直都在被observe劫持中
			val = val[k]; //val[k]是个取值操作，会触发defineProperty绑定的get方法
		});
		// 实际返回的是对应属性值
		return val;
	},

	// 当input事件触发，找到dom对应绑定得对象，修改对象值
	// 循环出修改的对象，并将新值（从input事件获取）赋予该对象得操作
	_setVMVal: function (vm, exp, value) {
		var val = vm;
		exp = exp.split('.');
		exp.forEach(function (k, i) {
			// 非最后一个key，更新val的值， 直到获取对象得最终对象，将该对象得值改为value
			if (i < exp.length - 1) {
				val = val[k];
			} else {
				val[k] = value;
			}
		});
	},
};

var updater = {
	textUpdater: function (node, value) {
		node.textContent = typeof value == 'undefined' ? '' : value;
	},

	// dom节点 和目前data中的实际值，将node的html改为value
	htmlUpdater: function (node, value) {
		node.innerHTML = typeof value == 'undefined' ? '' : value;
	},

	classUpdater: function (node, value, oldValue) {
		var className = node.className;
		className = className.replace(oldValue, '').replace(/\s$/, '');

		var space = className && String(value) ? ' ' : '';

		node.className = className + space + value;
	},

	// 判断新值得类型
	modelUpdater: function (node, value, oldValue) {
		node.value = typeof value == 'undefined' ? '' : value;
	},
};

// window.updater = updater
// window.compileUtil = compileUtil
// window.Compile = Compile

module.exports = {
	updater: updater,

	compileUtil: compileUtil,

	Compile: Compile,
};
