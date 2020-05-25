import VueRouter from 'vue-router';
import Vue from 'vue';
const Home = (resolve) => require(['./comp/home.vue'], resolve);
const Foo = (resolve) => require(['./comp/foo.vue'], resolve);
const Bar = (resolve) => require(['./comp/bar.vue'], resolve);
const Ket = (resolve) => require(['./comp/ket.vue'], resolve);
const Form = (resolve) => require(['./comp/form.vue'], resolve);
const slotsDemo = (resolve) => require(['./comp/slotsdemo.vue'], resolve);
const vuenew = (resolve) => require(['./comp/newVueTest/index.vue'], resolve);
const jsontest = (resolve) => require(['./comp/json-test.vue'], resolve);

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				scrollToTop: true,
			},
		},
		{
			path: '/foo',
			component: Foo,
		},
		{
			path: '/bar',
			component: Bar,
			children: [
				{
					// 当 /bar/barC1 匹配成功，
					// barC1 会被渲染在 bar 的 <router-view> 中
					path: 'barC1',
					name: 'barC1',
					component: () => import('./comp/barC/barc1.vue'),
				},
				{
					// 当 /bar/barC1 匹配成功，
					// barC2 会被渲染在 bar 的 <router-view> 中
					path: 'barC2',
					name: 'barC2',
					component: () => import('./comp/barC/barc2.vue'),
				},
			],
		},
		{
			path: '/ket',
			component: Ket,
			name: 'ket',
		},
		{
			path: '/form',
			component: Form,
			name: 'form',
		},
		{
			path: '/slotsdemo',
			component: slotsDemo,
			name: 'slotsdemo',
		},
		{
			path: '/vuenew',
			component: vuenew,
			name: 'vuenew',
		},
		{
			//json在线编辑测试
			path: '/json-test',
			component: jsontest,
			name: 'json-test',
		},
		{
			path: '/fictitiouslist', //虚拟列表
			name: 'fictitiouslist',
			component: () => import('./views/fictitiousList.vue'),
		},
		{
			path: '/vnode', //虚拟列表
			name: 'vnode',
			component: () => import('./comp/vnodemain.vue'),
		},
		{
			path: '/time',
			name: '/time',
			component: () => import('./views/fullTimeScreen.vue'),
		},
	],
});

export default router;
