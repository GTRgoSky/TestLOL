import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Test from './views/api/reactive.vue'


// const app = createApp(App)
// app.use(store).use(router).mount('#app')
const app = createApp(Test).mount('#app')
