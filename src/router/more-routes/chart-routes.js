const routes = [
  {
    path: '/echartPage',
    name: 'echartPage',
    redirect: '/echartPage/single-bar',
    component: () =>
      import(
        /* webpackChunkName: "echart_component_encapsulation" */ '@/views/echartPage/index.vue'
      ),
    children: [
      {
        path: 'single-bar',
        name: 'singleBar',
        component: () =>
          import(
            /* webpackChunkName: "echart_component_encapsulation" */ '@/views/echartPage/single-bar.vue'
          ),
        meta: {
          name: '单柱状图组件封装',
          icon: 'el-icon-data-analysis',
        },
      },
      {
        path: 'multi-bar',
        name: 'multiBar',
        component: () =>
          import(
            /* webpackChunkName: "echart_component_encapsulation" */ '@/views/echartPage/multi-bar.vue'
          ),
        meta: {
          name: '多柱状图组件封装',
          icon: 'el-icon-data-analysis',
        },
      },
      {
        path: 'bar-line',
        name: 'barLine',
        component: () =>
          import(
            /* webpackChunkName: "echart_component_encapsulation" */ '@/views/echartPage/bar-line.vue'
          ),
        meta: {
          name: '柱状图&折线图组件封装',
          icon: 'el-icon-data-line',
        },
      },
      {
        path: 'antv-page',
        name: 'antv',
        component: () =>
          import(
            /* webpackChunkName: "echart_component_encapsulation" */ '@/views/echartPage/antv-page.vue'
          ),
        meta: {
          name: 'antv使用',
          icon: 'el-icon-data-analysis',
        },
      },
    ],
  },
]
export default routes
