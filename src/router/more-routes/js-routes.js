const routes = [
  {
    path: '/jsPage',
    name: 'jsPage',
    redirect: '/jsPage/mousemove',
    component: () =>
      import(/* webpackChunkName: "async_page" */ '@/views/jsPage/index.vue'),
    children: [
      {
        path: 'mousemove',
        name: 'mousemove',
        component: () =>
          import(
            /* webpackChunkName: "echart_component_encapsulation" */ '@/views/jsPage/mousemove.vue'
          ),
        meta: {
          name: '鼠标拖动',
          icon: 'el-icon-data-analysis',
        },
      },
      {
        path: 'velocityPage',
        name: 'velocityPage',
        component: () =>
          import(
            /* webpackChunkName: "echart_component_encapsulation" */ '@/views/jsPage/velocityPage.vue'
          ),
        meta: {
          name: '动画',
          icon: 'el-icon-data-analysis',
        },
      },
      {
        path: 'swiperPage',
        name: 'swiperPage',
        component: () =>
          import(
            /* webpackChunkName: "echart_component_encapsulation" */ '@/views/jsPage/swiperPage.vue'
          ),
        meta: {
          name: '轮播图',
          icon: 'el-icon-data-analysis',
        },
      },
    ],
  },
]
export default routes
