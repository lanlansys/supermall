import {
    createApp
} from 'vue'
// import {
//     VueLoaderPlugin
// } from 'vue-loader-v16'
import App from './App.vue'
import router from './router'
app.config.globalProperties.$bus = bus
createApp(App).use(router).mount('#app')
// app.config.globalProperties.$bus=bus