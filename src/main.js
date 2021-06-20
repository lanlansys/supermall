import {
    createApp
} from 'vue'
// import {
//     VueLoaderPlugin
// } from 'vue-loader-v16'
import App from './App.vue'
import router from './router'
// import mitt from 'mitt'
// createApp(App).config.globalProperties.$bus = new mitt()
createApp(App).use(router).mount('#app')
// Vue.config.devtools = true;
// app.config.globalProperties.$bus=bus