import { createApp } from 'vue'
import App from './App.vue'
import globalRegisterAnt from './glabol'
import router from '@/router'
import store from '@/store'
import "./assets/reset.css"
import { updateLoadAction } from '@/store'

const app = createApp(App)
app.use(store)
updateLoadAction()
app.use(globalRegisterAnt)
app.use(router)
app.mount('#app')
