import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './registerServiceWorker'
Vue.config.productionTip = false;

import lodash from './lodash/index.js'
Vue.prototype.lodash=Vue.prototype._=lodash

import axios from './axios/index.js'
Vue.prototype.$axios = axios   

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import  ss from '../packages/index';
ss.install(Vue)




// import  editorModels from './components/index';
// Object.keys(editorModels).forEach((key:string) => {
//   var editorModel:any=editorModels;
//   Vue.component(key, editorModel[key]);
// })


const context = require.context('./editor-components', true, /\.vue$/);
context.keys().forEach((key) => {
  const component = context(key).default;
  Vue.component(component.name, component);
});
import './styles/index.scss';

 //全局注册，使用方法为:this.$axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
