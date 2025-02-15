import './assets/main.css'
import 'primeicons/primeicons.css'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'

import { createApp } from 'vue'
import store from './store'
import App from './App.vue'


const app = createApp(App);
app.use(router);
app.use(Buefy);
app.use(store)
app.mount('#app');
