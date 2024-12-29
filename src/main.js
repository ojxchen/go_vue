import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
    .use(router)   // 使用 Vue Router
    .use(ElementPlus)  // 使用 ElementPlus
    .mount('#app')  // 挂载 Vue 应用
