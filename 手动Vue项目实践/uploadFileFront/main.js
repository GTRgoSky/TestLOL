import Vue from 'vue'; //引入主角vue.js，这里是因为在webpack.config中进行配置地址了
import upload from './upload.vue';

var vm = new Vue({
	components: { upload },
	template: '<upload></upload>'
}).$mount('#app');
