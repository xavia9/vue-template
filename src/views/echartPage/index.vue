<template>
  <div class="echart-page">
    <!-- <side-bar :menuList="menuList">
      <router-view />
    </side-bar> -->
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from 'components/layout/SideBar.vue'

export default {
  name: 'echartPage',
  components: {
    SideBar,
  },
  data() {
    return {
      menuList: [],
    }
  },
  props: {},
  created() {
    // 生成菜单
    this.handleMenu()
  },
  mounted() {},
  methods: {
    // 生成菜单
    handleMenu() {
      // 生成echart相关页面的侧边栏菜单
      const echartRoute = this.$router.options.routes.find(
        (route) => route.path === '/echartPage'
      )
      const echartMenuList = echartRoute.children
      this.menuList = echartMenuList.map((item) => {
        return {
          routePath: `/echartPage/${item.path}`,
          name: item.meta.name,
          icon: item.meta.icon,
        }
      })
    },
  },
}
</script>

<style></style>
