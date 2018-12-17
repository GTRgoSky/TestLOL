import Vue from 'vue' //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import 'es6-promise/auto'
import store from './vuex/store'
import router from './router'
import App from './App.vue';
import {common} from './install';
import '../assets/anima.css'

// import { sync } from 'vuex-router-sync';

Vue.use(common,'通过args传入的参数')

// const unsync = sync(store, router) // done. Returns an unsync callback fn

new Vue({
    router,
    store,
    created() {},
    template: '<App/>',// == <app></app>
    components:{App}
}).$mount('#app')