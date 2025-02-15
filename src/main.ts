import 'primeicons/primeicons.css'
import './assets/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createApp } from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'



const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast)
app.mount('#app');
