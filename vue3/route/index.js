import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/HelloWorld.vue';
import composition from '../src/components/composition.vue';
import provideAndInject from '../src/components/stores/provideAndInject.vue';

const routerHistory = createWebHistory();

const router = createRouter({
	history: routerHistory,
	routes: [
		{
			path: '/',
			component: Home,
		},
		{
			path: '/composition',
			component: composition,
		},
		{
			path: '/provideAndInject',
			component: provideAndInject,
		},
		{
			path: '/ref',
			component: () => import('../src/components/ref.vue'),
		},
		{
			path: '/globalProperties',
			component: () => import('../src/components/globalProperties.vue'),
		},
		{
			path: '/excel',
			component: () => import('../src/components/excel.vue')
		}
	],
});

export default router;
