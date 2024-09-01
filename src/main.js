import { createApp, markRaw } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
// import element plus theme
import ElementPlus from 'element-plus'
import ru from 'element-plus/dist/locale/ru.mjs'
import 'normalize.css'
import router from './router'
import App from './App.vue'
const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
app.use(router)
app.use(pinia)
app.use(ElementPlus, { locale: ru })
app.mount('#app')
