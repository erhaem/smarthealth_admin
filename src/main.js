import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  router from './router'
import App from './App.vue'
import './components/app.js'
import './components/style.css' 
import store from './stores'
import iziToast from 'izitoast'
import {
    abilitiesPlugin
} from "@casl/vue";
import ability from "./stores/services/abilities"

const app = createApp(App)
app.use(iziToast).use(createPinia()).use(router).use(store).use(abilitiesPlugin, ability, {
    useGlobalProperties:true
}).mount('#app')

