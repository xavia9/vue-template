// // 导入Vue对象
// import Vue from 'vue'
// // 1.导入路由对象
// import VueRouter from 'vue-router'

// import tableData from '@/views/element/tabledata.vue'
// import dateTimePicker from '@/views/element/datetimepicker.vue'
// import datePicker from '@/views/element/datepicker.vue'
// import Dynamic from '@/views/skills/dynamic-components.vue'
// import dialogTable from '@/views/test/dialog-table.vue'
// import singleBar from '@/views/echart/single-bar.vue'
// import multiBar from '@/views/echart/multi-bar.vue'
// import barLine from '@/views/echart/bar-line.vue'

// // 2.注入插件
// Vue.use(VueRouter)

// // 3.定义路由
// const routes = {
//   path: '/multi-bar',
//   name: 'multiBar',
//   component: () => import('@/views/echart/multi-bar.vue'),
// }
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
  },
  {
    path: '/dynamic',
    name: 'Dynamic',
    component: () =>
      import(
        /* webpackChunkName: "dynamic_component" */ '@/views/skills/dynamic-comp.vue'
      ),
  },
  {
    path: '/asyncPage',
    name: 'asyncPage',
    component: () =>
      import(
        /* webpackChunkName: "async_page" */ '@/views/skills/asyncPage.vue'
      ),
  },
  {
    path: '/swiperPage',
    name: 'swiperPage',
    component: () =>
      import(
        /* webpackChunkName: "async_page" */ '@/views/swiper/swiperPage.vue'
      ),
  },
  {
    path: '/decisionFlow',
    name: 'decisionFlow',
    component: () =>
      import(/* webpackChunkName: "async_page" */ '@/views/decisionFlow.vue'),
  },
]
// // 4.创建router实例
// const router = new VueRouter({
//   routes,
// })

// // 5.导出router实例
// export default router
export default routes
