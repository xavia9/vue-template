/**
 * select 下拉框 底部触发指令
 */
// Vue.directive('selectLoadMore', {
//   bind(el, binding) {
//     // 获取element-ui定义好的scroll盒子
//     const SELECTWRAP_DOM = el.querySelector(
//       '.el-select-dropdown .el-select-dropdown__wrap'
//     )
//     SELECTWRAP_DOM.addEventListener('scroll', function() {
//       if (this.scrollHeight - this.scrollTop < this.clientHeight + 1) {
//         binding.value()
//       }
//     })
//   },
// })

const vSelectLoadMore = {
  bind(el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector(
      '.el-select-dropdown .el-select-dropdown__wrap'
    )
    SELECTWRAP_DOM.addEventListener('scroll', function() {
      if (this.scrollHeight - this.scrollTop < this.clientHeight + 1) {
        binding.value()
      }
    })
  },
}
export default vSelectLoadMore
