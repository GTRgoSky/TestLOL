import { createApp } from 'vue';
import App from './App.vue';
import router from '../route/index.js';

const app = createApp(App);
app.use(router);
// 这个配置只有写在挂载之前,初始化this才可以取到,
app.config.globalProperties.globalTest = 'Test';
app.mount('#app');
