// 导入Vue对象
import Vue from 'vue';
// 1.导入路由对象
import VueRouter from 'vue-router';

const App = () => import('@/App');

// 2.注入插件
Vue.use(VueRouter);

// 3.定义路由
const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
  },
];

// 4.创建router实例
const router = new VueRouter({
  routes,
});

// 5.导出router实例
export default router;
