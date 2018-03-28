import Vue from 'vue' //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import VueRouter from 'vue-router'
import Navigation from 'vue-navigation'

Vue.use(VueRouter)

const Home = {
    template: '<div>home</div>'
}
const Foo = {
    template: `<div>foo</div>`
}
const Bar = {
    template: `
    <div>
      bar
    </div>
  `
}

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

Vue.use(Navigation, {
    router
})

new Vue({
    router,
    template: `
      <div id="app">
        <h1>物理返回监听测试</h1>
        <a href="http://www.baidu.com">123</a>
        <ul>
          <li><router-link :to="{ name: 'home', params: { userId: 123 }, query: { userId: '123' }}">/</router-link></li>
          <li><router-link :to="{ path: 'foo', query: { userId: '456' }}">/foo</router-link></li>
          <li><router-link to="/bar?userId=789">/bar</router-link></li>
        </ul>
        <navigation>
            <router-view></router-view>
        </navigation>
      </div>
    `,
    created() {
        // bind event
        this.$navigation.on('forward', (to, from) => {
            // console.log('forward to', to, 'from ', from)
            console.log('forward',to.route.query.userId)
        })
        this.$navigation.on('back', (to, from) => {
            // console.log('back to', to, 'from ', from)
            console.log('back',to.route.query.userId)
        })
        // this.$navigation.on('replace', (to, from) => {
        //     console.log('replace to', to, 'from ', from)
        // })
        // this.$navigation.on('refresh', (to, from) => {
        //     console.log('refresh to', to, 'from ', from)
        // })
        // this.$navigation.on('reset', () => {
        //     console.log('reset')
        // })
        // // and use [once, off] methods
        // this.$navigation.once('forward', () => {
        //     console.log('appear once')
        // })
        // const off = () => {
        //     console.log('will not appear')
        // }
        // this.$navigation.on('forward', off)
        // this.$navigation.off('forward', off)
    }
}).$mount('#app')