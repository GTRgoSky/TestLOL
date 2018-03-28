import Vue from 'vue' //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import VueRouter from 'vue-router'

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
      <div style="height:500px"></div>
      <p id="anchor">Anchor</p>
    </div>
  `
}

const scrollBehavior = (to, from, savedPosition) => {
    console.log(to,'to');
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        console.log(savedPosition,'savedPosition') //savedPosition记录的是from页面的滚动条位置
        return savedPosition
    } else {
        const position = {}
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
            console.log(to.hash,'hash')//#anchor 并且匹配的是id值
            position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        console.log(to.matched,'matched')
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    }
}
console.log(__dirname);
const router = new VueRouter({
    mode: 'history',
    base: '/VueScrollBehavior/',
    scrollBehavior,
    routes: [{
            path: '/',
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

new Vue({
    router,
    template: `
      <div id="app">
        <h1>Scroll Behavior</h1>
        <ul>
          <li><router-link to="/">/</router-link></li>
          <li><router-link to="/foo">/foo</router-link></li>
          <li><router-link to="/bar">/bar</router-link></li>
          <li><router-link to="/bar#anchor">/bar#anchor</router-link></li>
        </ul>
        <router-view class="view"></router-view>
      </div>
    `
}).$mount('#app')