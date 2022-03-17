<template>
  <div class="tags-view h100vh">
    <el-container class="h100 flex-column">
      <!-- <el-header> -->
      <!-- 顶部菜单 -->
      <nav-top :menuTop="menuTop"></nav-top>
      <!-- </el-header> -->
      <el-container class="flex-area">
        <el-aside width="200px" v-show="showSideBar">
          <side-bar :menuList="menuList"></side-bar>
        </el-aside>
        <el-main class="h100 flex-column">
          <div class="flex-area bgc-fff">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
const menuTop = [
  {
    routePath: '/asyncPage',
    name: '异步组件',
  },
  {
    routePath: '/dynamic',
    name: '动态组件',
  },
  {
    routePath: '/jsPage/mousemove',
    name: 'js相关',
  },
  {
    routePath: '/elementPage/dialogPage',
    name: 'element组件封装',
  },
  {
    routePath: '/echartPage/single-bar',
    name: 'echart组件封装',
  },
]
import NavTop from 'components/layout/NavTop.vue'
import SideBar from 'components/layout/SideBar.vue'

export default {
  name: 'TagsView',
  components: {
    NavTop,
    SideBar,
  },
  data() {
    return {
      showSideBar: false,
      menuList: [],
    }
  },
  props: {
    // menuTop: {
    //   type: Array,
    //   required: true,
    // },
    // menuList: {
    //   type: Array,
    //   required: true,
    // },
  },
  watch: {
    '$route.path': {
      handler(newVal, oldval) {
        this.activeMenuItem = this.$route.path
        this.generateMenu()
        this.showSidebar()
      },
      deep: true,
    },
  },
  created() {
    this.menuTop = menuTop
    this.generateMenu()
  },
  mounted() {},
  methods: {
    // 处理侧边栏菜单
    handleMenu(firstRoutePath) {
      const routeList = this.$router.options.routes.find(
        (route) => route.path === firstRoutePath
      )
      const menuList = routeList.children
      this.menuList = menuList.map((item) => {
        return {
          routePath: `${firstRoutePath}/${item.path}`,
          name: item.meta.name,
          icon: item.meta.icon,
        }
      })
    },
    // 生成不同的菜单
    generateMenu() {
      console.log()
      if (this.$route.path === '/elementPage/dialogPage') {
        this.handleMenu('/elementPage')
      } else if (this.$route.path === '/echartPage/single-bar') {
        this.handleMenu('/echartPage')
      }
    },
    showSidebar() {
      const arr = ['elementPage', 'echartPage']
      this.showSideBar = arr.includes(this.$route.matched[0].name)
    },
  },
}
</script>

<style>
.tags-view {
}
</style>
