import constantMoreRoutes from './constant-more-routes.js'

import page404 from '@/views/common/error-page/404'
import login from '@/views/login'

let initialRoutes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    // component: () => import('@/views/common/error-page/404'),
    component: login,
    hidden: false,
    meta: {
      showSideBar: false,
    },
  },
  {
    path: '/404',
    name: 'page404',
    // component: () => import('@/views/common/error-page/404'),
    component: page404,
    hidden: false,
    meta: {
      showSideBar: false,
    },
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   redirect: '/404',
  // },
  {
    path: '*',
    redirect: '/404',
  },
]
let constantRoutes = [...initialRoutes, ...constantMoreRoutes]

export default constantRoutes
