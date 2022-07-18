<template>
  <div class="tags-view h100">
    <el-container class="h100 flex-column">
      <!-- <el-header> -->
      <!-- 顶部菜单 -->
      <nav-top :menuTop="menuTop"></nav-top>
      <!-- </el-header> -->
      <el-main class="h100 flex-row">
        <side-bar :menuList="menuList" v-show="showSideBar"></side-bar>
        <div class="flex1 bgc-fff">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
const menuTop = [
  {
    routePath: "/home",
    name: "首页",
  },
  {
    routePath: "/asyncPage",
    name: "异步组件",
  },
  {
    routePath: "/dynamic",
    name: "动态组件",
  },
  {
    routePath: "/jsPage/mousemove",
    name: "js相关",
  },
  {
    routePath: "/elementPage/dialogPage",
    name: "element组件封装",
  },
  {
    routePath: "/echartPage/single-bar",
    name: "echart组件封装",
  },
  {
    routePath: "/decisionFlow",
    name: "决策流",
  },
];
import NavTop from "components/layout/NavTop.vue";
import SideBar from "components/layout/SideBar.vue";

export default {
  name: "TagsView",
  components: {
    NavTop,
    SideBar,
  },
  data() {
    return {
      showSideBar: false,
      menuList: [],
      menuMap: {}, //菜单映射表
    };
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
    "$route.path": {
      handler(newVal, oldval) {
        // this.activeMenuItem = this.$route.path
        this.generateMenuMap();
        // 1.侧边栏是否显示
        this.showSidebar();
        // 2.生成侧边栏
        if (this.showSideBar) {
          this.generateSideMenu();
        }
      },
      deep: true,
    },
  },
  created() {
    this.menuTop = menuTop;
    // this.generateSideMenu()
  },
  mounted() {},
  methods: {
    generateRouteName() {},
    // 生成印射菜单
    generateMenuMap() {
      this.$router.options.routes.forEach((route) => {
        this.menuMap = {
          ...this.menuMap,
          [route.name]: route.children, //key:顶部菜单 value:侧边菜单
        };
      });
    },
    // 生成侧边菜单
    generateSideMenu() {
      const routeName = this.$route.matched[0].name;
      // const routeList = this.$router.options.routes.find(
      //   (route) => route.name === routeName
      // )
      // 子节点
      const menuList = this.menuMap[routeName];
      // 子节点没数据 侧边栏不必生成
      if (this.$isLengthZero(menuList)) return;
      // const menuList = routeList.children
      // 侧边菜单
      this.menuList = menuList.map((item) => {
        return {
          routePath: `/${routeName}/${item.path}`,
          name: item.meta.name,
          icon: item.meta.icon,
        };
      });
    },
    // 侧边菜单是否显示
    showSidebar() {
      const matched = this.$route.matched;
      // console.log(matched)
      if (matched.length <= 1) {
        this.showSideBar = false;
      } else {
        this.showSideBar = true;
      }
      // 子节点没数据 侧边栏不显示
      // const routeName = matched[0].name
      // const menuList = this.menuMap[routeName]
      // this.showSideBar = !this.$isLengthZero(menuList)
    },
  },
};
</script>

<style>
.tags-view {
}
</style>
