import Vue from 'vue' //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import router from './router'
import App from './App.vue'

new Vue({
    router,
    created() {
        console.log(123);
    },
    template: '<App/>',// == <app></app>
    components:{App}
}).$mount('#app')