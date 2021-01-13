import { createApp } from 'vue'
import App from './App.vue'
import compoent from './components'
import router from './router'

createApp(App).use(compoent).use(router).mount('#app')
