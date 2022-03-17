<template>
  <div class="element-page">
    <!-- <tags-view :menuTop="menuTop" :menuList="menuList"> </tags-view> -->
    <router-view></router-view>
  </div>
</template>

<script>
import TagsView from 'components/layout/TagsView.vue'

export default {
  name: 'elementPage',
  components: {
    TagsView,
  },
  data() {
    return {
      menuList: [],
    }
  },
  created() {
    this.handleMenu()
  },
  mounted() {},
  methods: {
    // 生成菜单
    handleMenu() {
      // 生成element侧边栏菜单
      const elementRoute = this.$router.options.routes.find(
        (route) => route.path === '/elementPage'
      )
      const elementMenuList = elementRoute.children
      this.menuList = elementMenuList.map((item) => {
        return {
          routePath: `/elementPage/${item.path}`,
          name: item.meta.name,
          icon: item.meta.icon,
        }
      })
    },
  },
}
</script>

<style>
.element-page {
  height: 100%;
}
</style>
