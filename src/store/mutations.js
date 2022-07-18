// import { SET_MENUID } from "./mutation-types";
import router from '@/router/index'
import constantRoutes from '@/router/constant-routes.js'

const mutations = {
  setToken(state, token) {
    state.token = token
    window.sessionStorage.setItem('token', token)
  },
  setMenuId(state, menuId) {
    state.menuId = menuId
  },
  setMenuList(state, menuList) {
    state.menuList = menuList
  },
  setPackageId(state, packageId) {
    state.packageId = packageId
    window.sessionStorage.setItem('packageId', packageId)
  },
  setPackageCode(state, packageCode) {
    state.packageCode = packageCode
  },
  setRuleComp(state, { ruleCompId, typeName }) {
    state.ruleComp.ruleCompId = ruleCompId
    state.ruleComp.typeName = typeName
  },
  setRouterType(state, type) {
    state.routerType = type
  },
  setRouterList(state, dynamicRoutes) {
    // 保存动态路由
    state.dynamicRoutes = dynamicRoutes
    // 合并路由
    // 静态路由 + 动态路由 合并 完整路由
    const allRoutes = constantRoutes.concat(dynamicRoutes)
    // 向router对象中添加路由
    router.options.routes = allRoutes
    dynamicRoutes.forEach((route) => {
      router.addRoute(route)
    })
  },
}

export default mutations
