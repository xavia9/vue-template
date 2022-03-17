const routes = [
  {
    path: '/elementPage',
    name: 'elementPage',
    redirect: '/elementPage/dialogPage',
    component: () => import('@/views/elementPage/index.vue'),
    children: [
      {
        path: 'dialogPage',
        name: 'dialogPage',
        component: () =>
          import(
            /* webpackChunkName: "form_component_encapsulation" */ '@/views/elementPage/dialogPage.vue'
          ),
        meta: {
          name: '对话框组件封装',
          icon: 'el-icon-document',
        },
      },
      {
        path: 'formPage',
        name: 'formPage',
        component: () =>
          import(
            /* webpackChunkName: "form_component_encapsulation" */ '@/views/elementPage/formPage.vue'
          ),
        meta: {
          name: '表单组件封装',
          icon: 'el-icon-document',
        },
      },
      {
        path: 'tablePage',
        name: 'tablePage',
        component: () =>
          import(
            /* webpackChunkName: "table_component_encapsulation" */ '@/views/elementPage/tablePage.vue'
          ),
        meta: {
          name: '表格组件封装',
          icon: 'el-icon-document',
        },
      },
      {
        path: 'tableScope',
        name: 'tableScope',
        component: () =>
          import(
            /* webpackChunkName: "table_component_encapsulation" */ '@/views/elementPage/tableScope.vue'
          ),
        meta: {
          name: '表格作用域',
          icon: 'el-icon-document',
        },
      },
      {
        path: 'dateTimePage',
        name: 'dateTimePage',
        component: () =>
          import(
            /* webpackChunkName: "datetimepicker_component_encapsulation" */ '@/views/elementPage/dateTimePage.vue'
          ),
        meta: {
          name: '时间组件封装',
          icon: 'el-icon-time',
        },
      },
      {
        path: 'datePickerPage',
        name: 'datePickerPage',
        component: () =>
          import(
            /* webpackChunkName: "datepicker_component_encapsulation" */ '@/views/elementPage/datePickerPage.vue'
          ),
        meta: {
          name: '日期组件封装',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'uploadPage',
        name: 'uploadPage',
        component: () =>
          import(
            /* webpackChunkName: "datepicker_component_encapsulation" */ '@/views/elementPage/uploadPage.vue'
          ),
        meta: {
          name: '上传组件封装',
          icon: 'el-icon-date',
        },
      },
      {
        path: 'selectPaginationPage',
        name: 'selectPaginationPage',
        component: () =>
          import(
            /* webpackChunkName: "datepicker_component_encapsulation" */ '@/views/elementPage/selectPaginationPage.vue'
          ),
        meta: {
          name: '下拉框分页功能组件',
          icon: 'el-icon-date',
        },
      },
    ],
  },
]
export default routes
