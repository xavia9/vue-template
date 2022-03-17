import constantMoreRoutes from './constant-more-routes.js'

import page404 from '@/views/common/error-page/404'

let constantRoutes = [
  {
    path: '/404',
    name: 'page404',
    // component: () => import('@/views/common/error-page/404'),
    component: page404,
    hidden: true,
  },
  {
    path: '/',
    redirect: '/asyncPage',
    name: 'asyncPage',
  },
  // {
  //   path: '/bar-line',
  //   name: 'barLine',
  //   component: () => import('@/views/echart/bar-line.vue'),
  //   // component: barLine,
  // },
]
let resultRoutes = [...constantRoutes, ...constantMoreRoutes]

export default resultRoutes
