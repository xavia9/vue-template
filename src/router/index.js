// 导入Vue对象
import Vue from 'vue'
// 1.导入路由对象
import VueRouter from 'vue-router'
// import constantMoreRoutes from './constant-more-routes.js'
import routes from './constant-routes.js'

// import tableData from '../views/element/tabledata.vue'
// import dateTimePicker from '../views/element/datetimepicker.vue'
// import datePicker from '../views/element/datepicker.vue'
// import Dynamic from '../views/skills/dynamic-components.vue'
// import dialogTable from '../views/test/dialog-table.vue'
// import singleBar from '../views/echart/single-bar.vue'
// import multiBar from '../views/echart/multi-bar.vue'
// import barLine from '../views/echart/bar-line.vue'

// 2.注入插件
Vue.use(VueRouter)

// 3.定义路由
// const routes = [
//   {
//     path: '/bar-line',
//     name: 'barLine',
//     component: () => import('@/views/echart/bar-line.vue'),
//     // component: barLine,
//   },
// ]
// const routes = [
// {
//   path: '/dynamic',
//   name: 'Dynamic',
//   component: Dynamic,
// },
// {
//   path: '/table',
//   name: 'tableData',
//   component: tableData,
// },
// {
//   path: '/datetime',
//   name: 'dateTimePicker',
//   component: dateTimePicker,
// },
// {
//   path: '/date',
//   name: 'datePicker',
//   component: datePicker,
// },
// {
//   path: '/dialogtable',
//   name: 'dialogTable',
//   component: dialogTable,
// },
// {
//   path: '/single-bar',
//   name: 'singleBar',
//   component: singleBar,
// },
// {
//   path: '/bar-page',
//   name: 'barPage',
//   component: import('../views/echart-page/bar-page.vue'),
// },
// {
//   path: '/multi-bar',
//   name: 'multiBar',
//   component: multiBar,
// },
//   {
//     path: '/bar-line',
//     name: 'barLine',
//     component: () => import('@/views/echart/bar-line.vue'),
//     // component: barLine,
//   },
// ]

// 4.创建router实例
const router = new VueRouter({
  routes,
})
// const router = new VueRouter({
//   constantRoutes,
// })
// console.log(router)
// 5.导出router实例
export default router
