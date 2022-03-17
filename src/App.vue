<template>
  <div id="app">
    <tags-view></tags-view>
  </div>
</template>

<script>
// const menuTop = [
//   {
//     routePath: '/asyncPage',
//     name: '异步组件',
//   },
//   {
//     routePath: '/dynamic',
//     name: '动态组件',
//   },
//   {
//     routePath: '/elementPage/formPage',
//     name: 'element组件封装',
//   },
//   {
//     routePath: '/echartPage/single-bar',
//     name: 'echart组件封装',
//   },
// ]
import { getQueryObject } from '../src/common/utils'
import TagsView from 'components/layout/TagsView.vue'

export default {
  name: 'App',
  components: {
    TagsView,
  },
  data() {
    return {
      activeMenuItem: '',
    }
  },
  watch: {
    '$route.path': {
      handler(newVal, oldval) {
        this.activeMenuItem = this.$route.path
      },
      deep: true,
    },
  },
  created() {
    // this.menuTop = menuTop
    // this.handleMenu()
    console.log(1)
    console.log(getQueryObject('http://www.baidu.com?name=1'))
  },
  mounted() {
    // new Promise((resolve, reject) => {
    //   setTimeout(() => reject(111), 1000)
    // }).then((data) => {
    //   console.log(data)
    // })
  },
  methods: {
    // // 生成菜单
    // handleMenu() {
    //   // 生成element侧边栏菜单
    //   const elementRoute = this.$router.options.routes.find(
    //     (route) => route.path === '/elementPage'
    //   )
    //   const elementMenuList = elementRoute.children
    //   this.menuList = elementMenuList.map((item) => {
    //     return {
    //       routePath: `/elementPage/${item.path}`,
    //       name: item.meta.name,
    //       icon: item.meta.icon,
    //     }
    //   })
    // },
  },
}
</script>

<style lang="scss">
html,
body,
div,
p,
img,
a {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  height: 100vh;
}
</style>
