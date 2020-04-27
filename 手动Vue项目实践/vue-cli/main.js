import Vue from 'vue'; //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import 'es6-promise/auto';
import store from './vuex/store';
import router from './router';
import App from './App.vue';
import { common } from './install';
import '../assets/anima.css';

// import { sync } from 'vuex-router-sync';

// 异步加载
const AsyncComponent = () => ({
	// 需要加载的组件 (应该是一个 `Promise` 对象)
	component: import('./views/async/async.vue'),
	// 异步组件加载时使用的组件
	loading: require('./views/async/load.vue'),
	// 加载失败时使用的组件
	error: require('./views/async/load.vue'),
	// 展示加载时组件的延时时间。默认值是 200 (毫秒)
	delay: 200,
	// 如果提供了超时时间且组件加载也超时了，
	// 则使用加载失败时使用的组件。默认值是：`Infinity`
	timeout: 3000,
});
Vue.component('async-component', AsyncComponent);

Vue.use(common, '通过args传入的参数');

import _hostname from './envset';
console.log(test, _hostname);
// const unsync = sync(store, router) // done. Returns an unsync callback fn
Vue.config.errorHandler = function (err, vm, info) {
	// handle error
	// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
	// 只在 2.2.0+ 可用
	console.error('%c err:' + err, 'background:#000;color:#fff');
};
new Vue({
	router,
	store,
	created() {},
	template: '<App/>', // == <app></app>
	components: { App },
}).$mount('#app');
