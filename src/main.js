import { createApp } from 'vue'
import App from './App.vue'
import globalRegisterAnt from './glabol'
import router from '@/router'
import store from '@/store'
import "./assets/reset.css"

const app = createApp(App)
app.use(store)
app.use(globalRegisterAnt)
app.use(router)
app.mount('#app')
