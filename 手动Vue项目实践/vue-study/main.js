import Vue from 'vue'; //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import testA from './test.vue';
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

// Vue.config.performance =
Vue.config.optionMergeStrategies.celue = function (parentVal, childVal) {
	console.log(parentVal, childVal, 6);
	return parentVal
		? parentVal + childVal
		: '我是由策略改变的返回值:' + childVal;
};
var vm = new Vue({
	data: {
		test: 1,
		ttoo: 7,
	},
	created() {},
	mounted() {},
	celue: '测试一个策略',
	a: 66,
	components: {
		testA,
	},
	template: '<test-a/>',
}).$mount('#app');

// console.log(Vue, 56)
console.log(vm.$options, 67);

//Vue.extend，使开发者可以给Vue的构造函数上添加一些默认的自定义值
var vmt = Vue.extend({
	data() {
		return {
			test: 2,
			ttoo: 8,
		};
	},
	celue: '测试一个孩子策略',
	created: [
		function () {
			console.log(this, 88888);
			console.log('parent 1');
		},
		function () {
			console.log('parent 2');
		},
	],
}); //继承一次构造函数vm不存在
console.log(777);
var vmtv = new vmt({}); //执行一次实例化，vm存在
// console.log(vmt)
console.log(vmtv, vmtv.$options, 78);

var vmtt = vmt.extend({
	data() {
		return {
			test: 5,
			ttoo: 6, //如果不设置，则继承了上一级的ttoo
		};
	},
	celue: '测试一个孙子策略',
	created: [
		function () {
			console.log('child 1');
		},
	],
});
var vmttv = new vmtt({
	data: {
		test: 3,
	},
	created: [
		function () {
			console.log('gradeson 1');
		},
	],
});
//vmttv会继承ttoo，因为vmtt是他的父类，而vmt是vmtt的父类
//集成的是构造函数上的属性，传入的option不继承
console.log(vmttv, 89);
