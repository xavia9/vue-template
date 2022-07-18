// import Vue from 'vue'
import selectLoadMore from './v-selectLoadMore'
import permission from './v-permission'

// 自定义指令
const directives = {
  selectLoadMore,
  permission,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}
