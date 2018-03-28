import Vue from 'vue' //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import VueRouter from 'vue-router'
import Hello from './component/hello.vue'
import axios from 'axios'
import App from './App.vue'

Vue.use(VueRouter)

function dynamicPropsFn(route) {
    const now = new Date()
    return {
        name: (now.getFullYear() + parseInt(route.params.years) - 1) + '!'
    }
}

const Default = {
    template: '<div class="default">default</div>'
}
const Foo = {
    template: '<div class="foo">foo</div>'
}
const Bar = {
    template: '<div class="bar">bar</div>'
}

const Parent = {
    data() {
        return {
            transitionName: 'slide-left'
        }
    },
    beforeRouteEnter: (to, from, next) => {
        console.log(123);
        next(vm=>{
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            vm.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        })
    },
    template: `
      <div class="parent">
        <h2>Parent</h2>
        <transition :name="transitionName">
          <router-view class="child-view"></router-view>
        </transition>
      </div>
    `
}

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/parent',
            component: Parent,
            children: [{
                    path: '',
                    component: Default
                },
                {
                    path: 'foo',
                    component: Foo
                },
                {
                    path: 'bar',
                    component: Bar
                }
            ]
        },
        {
            path: '/',
            component: Hello
        }, // No props, no nothing
        {
            path: '/hello/:name',
            component: Hello,
            props: true
        }, // Pass route.params to props
        {
            path: '/static',
            component: Hello,
            props: {
                name: 'world'
            }
        }, // static values
        {
            path: '/dynamic/:years',
            component: Hello,
            props: dynamicPropsFn
        }, // custom logic for mapping between route and props
        {
            path: '/attrs',
            component: Hello,
            props: {
                name: 'attrs'
            }
        }
    ]
})



new Vue({
    router,
    components: {
        app:App
    }
    // template: '<App/> || <app></app>'
}).$mount('#app')