import VueRouter from 'vue-router'
import Vue from 'vue'
const Home = resolve => require(['./comp/home.vue'], resolve);
const Foo = resolve => require(['./comp/foo.vue'], resolve);
const Bar = resolve => require(['./comp/bar.vue'], resolve);
const Ket = resolve => require(['./comp/ket.vue'], resolve);

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                scrollToTop: true
            }
        },
        {
            path: '/foo',
            component: Foo
        },
        {
            path: '/bar',
            component: Bar,
            children:[
                {
                    // 当 /bar/barC1 匹配成功，
                    // barC1 会被渲染在 bar 的 <router-view> 中
                    path: 'barC1',
                    name: "barC1",
                    component:  () => import('./comp/barC/barc1.vue'),
                    
                },
                {
                    // 当 /bar/barC1 匹配成功，
                    // barC2 会被渲染在 bar 的 <router-view> 中
                    path: 'barC2',
                    name: "barC2",
                    component: () => import('./comp/barC/barc2.vue')
                }
            ]
        },
        {
            path: '/ket',
            component: Ket,
            name : 'ket'
        }
    ]
})

export default router;