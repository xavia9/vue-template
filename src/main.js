import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './common/axios.js'
import store from './store'
import directives from './directives'
// import ElementUI from 'element-ui' //整体引入
import './plugins/element.js' //按需引入
// import uIcomponents from './plugins/uIcomponents.js'
import 'element-ui/lib/theme-chalk/index.css'
// import './config/rem';
import './config/index.js'
// 全局公共样式
// import './config/other/css.js'

// console.log(router)

Vue.config.productionTip = false
// 全局注册
Vue.prototype.$request = axios
// 自定义指令
Vue.use(directives)
// Vue.use(ElementUI)
// Vue.use(uIcomponents)
//打印App 没有template 但是有render函数 表示vue-template-compiler已经内部将其转换成了render
// console.log(App);

new Vue({
  el: '#app',
  router,
  store,
  // 直接传入组件对象 App.vue里面的template会替换index.html里面#app的内容
  render: (h) => h(App),
})
