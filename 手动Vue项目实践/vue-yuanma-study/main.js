import Vue from 'vue'; //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import Props from './props/index.vue';

var vm = new Vue({
	template: '<Props/>',
	components: { Props },
}).$mount('#app');
