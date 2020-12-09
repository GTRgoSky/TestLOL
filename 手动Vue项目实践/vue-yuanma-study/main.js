import Vue from 'vue'; //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
// import Props from './props/index.vue';
import compile from './compile/index.vue'

console.log(compile);


var vm = new Vue(
{
	template: '<compile/>',
	components: { compile },
}
)

vm.$mount('#app');
