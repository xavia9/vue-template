const vPermission = {
  bind(el, binding, vnode) {
    const permission = binding.value // 获取权限值
    const page_name = router.currentRoute.value.name // 获取当前路由名称
    const have_permissions = store.state.permission_list[page_name] || '' // 当前用户拥有的权限
    if (!have_permissions.includes(permission)) {
      el.parentElement.removeChild(el) //不拥有该权限移除dom元素
    }
  },
}
export default vPermission

// v-permission = "'CR'"
