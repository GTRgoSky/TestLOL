import Vue from 'vue' //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import router from './router'
import App from './App.vue';
import {common} from './install';
Vue.use(common,'通过args传入的参数')

new Vue({
    router,
    created() {},
    template: '<App/>',// == <app></app>
    components:{App}
}).$mount('#app')