// import Vue from 'vue'
import selectLoadMore from './v-selectLoadMore'

// 自定义指令
const directives = {
  selectLoadMore,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}
