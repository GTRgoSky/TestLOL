import Vue from 'vue' //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import VueRouter from 'vue-router'
import testA from './test.vue'



Vue.use(VueRouter)

const Home = {
    template: `<div>
        <div>
            <div ref='test'>1</div>
        </div>
    </div>`
}

// Vue.config.performance = 

var vm = new Vue({
    data(){
        return {
        }
    },
    created() {
    },
    mounted(){
        // console.log(this.$refs.test)
    },
    components:{testA},
    template:'<test-a/>',
}).$mount('#app')