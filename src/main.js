import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
// import './config/rem';

// 全局使用
Vue.config.productionTip = false;

//打印App 没有template 但是有render函数 表示vue-template-compiler已经内部将其转换成了render
// console.log(App);

new Vue({
  router,
  store,
  // 直接传入组件对象 App.vue里面的template会替换index.html里面#app的内容
  render: (h) => h(App),
}).$mount('#app');
