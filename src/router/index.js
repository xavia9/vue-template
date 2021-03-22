// 导入Vue对象
import Vue from 'vue';
// 1.导入路由对象
import VueRouter from 'vue-router';

import tableData from '../views/tableData.vue';
import timePicker from '../views/timePicker.vue';
import datePicker from '../views/datePicker.vue';
// 2.注入插件
Vue.use(VueRouter);

// 3.定义路由
const routes = [
  {
    path: '/table',
    name: 'tableData',
    component: tableData,
  },
  {
    path: '/time',
    name: 'timePicker',
    component: timePicker,
  },
  {
    path: '/date',
    name: 'datePicker',
    component: datePicker,
  },
];

// 4.创建router实例
const router = new VueRouter({
  routes,
  mode: 'history',
});

// 5.导出router实例
export default router;
