import { genarateRoutes } from '@/utils/utils'
import permissionList from '../router/permissionList'

const actions = {
  login({ commit, state }) {
    return new Promise((resolve, reject) => {
      // const params = {}
      // // 发送请求
      // this.$request('xxxx', params).then((res) => {
      //   if (res.code === 200) {
      //     // 权限菜单
      //     const {token,username} = res.data
      //     commit('setToken', token)
      //     resolve()
      //   }
      // })
    })
  },
  loginOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      // const params = {}
      // // 发送请求
      // this.$request('xxxx', params).then((res) => {
      //   if (res.code === 200) {
      //     // 权限菜单
      //     const {token,username} = res.data
      commit('setToken', '')
      commit('setUserName', '')
      resolve()
      //   }
      // })
    })
  },
  setMenuList({ commit, state }) {
    // 接收返回来的 路由数组
    return new Promise((resolve, reject) => {
      // const params = {}
      // // 发送请求
      // this.$request('xxxx', params).then((res) => {
      //   if (res.code === 200) {
      //     // 权限菜单
      //     const datas = res.data
      //     // 调用 genarateRoutes 来解析后端返回来的树
      //     const routes = genarateRoutes(datas, [])
      //     // 保存至vuex
      //     commit('setRouterList', routes)
      //     resolve()
      //   }
      // })
      // 调用 genarateRoutes 来解析后端返回来的树
      const routes = genarateRoutes(permissionList, [])
      // 生成路由
      commit('setRouterList', routes)
      resolve()
    })
  },
}
export default actions
