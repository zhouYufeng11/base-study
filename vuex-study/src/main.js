import store from './store/index.js';
import App from './App.vue';

const { createApp } = Vue;

const app = createApp(App);

//	注册插件 -> 全局
app.use(store);

console.log(app);

app.mount('#app');