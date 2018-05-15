import VueRouter from 'vue-router'
import Vue from 'vue'

const Home = resolve => require(['./comp/home.vue'], resolve);
const Foo = resolve => require(['./comp/foo.vue'], resolve);
const Bar = resolve => require(['./comp/bar.vue'], resolve);

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [{
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
            meta: {
                scrollToTop: true
            }
        }
    ]
})

export default router;