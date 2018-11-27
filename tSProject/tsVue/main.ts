import Vue from 'vue';
import App from './App.vue';
import {content, contentt, test} from './a.js'
 

new Vue({
  template: '<App/>',// == <app></app>
  mounted() { 
    console.log(content, contentt);
    test();
  },
  components:{App}
}).$mount('#app');
