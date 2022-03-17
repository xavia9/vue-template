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
    ],
  },
]
export default routes
