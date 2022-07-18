<template>
  <div
    :class="['side-bar', isCollapse ? 'menu-close' : 'menu-open']"
    :style="toggleContainer"
  >
    <el-aside class="h100 bgc-fff">
      <!-- <side-bar :menuList="menuList"></side-bar> -->
      <el-menu
        :default-active="activeMenuItem"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        @open="handleOpen"
        @close="handleClose"
        @select="selectSideMenu"
      >
        <el-menu-item
          :index="menuItem.routePath"
          v-for="menuItem in menuList"
          :key="menuItem.routePath"
        >
          <i :class="menuItem.icon"></i>
          <span slot="title" class="menu-item">{{ menuItem.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <div class="toggle-button" @click="toggleCollapse">
      <i class="el-icon-arrow-left"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  components: {},
  data() {
    return {
      activeMenuItem: "",
      isCollapse: false,
      toggleContainer: {
        width: "500px",
      },
    };
  },
  props: {
    menuList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    "$route.path": {
      handler(newVal, oldval) {
        this.activeMenuItem = this.$route.path;
      },
      deep: true,
    },
  },
  computed: {},
  created() {
    this.activeMenuItem = this.$route.path;
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 选择侧边栏（可能涉及权限控制）
    selectSideMenu(routePath) {
      if (routePath === this.$route.path) return;
      this.$router.push(routePath);
    },
    // 点击折叠按钮切换bool值
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      // if (this.isCollapse) {
      //   this.toggleContainer.width = "83px";
      // } else {
      //   this.toggleContainer.width = "200px";
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  position: relative;
  height: 100%;
  /* width: 100%; */
  overflow: hidden;
  transition: all 0.5s;
}
.menu-item {
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 折叠动画 */
.el-aside {
  // transition: all 0.5s;
  width: calc(100% - 40px) !important;
  height: 100%;
  position: relative;
  transition: all 0.5s;
}
.menu-close {
  width: 100px !important;
}
.menu-open {
  width: 300px !important;
}
.toggle-button {
  width: 40px;
  height: 100px;
  line-height: 100px;
  position: absolute;
  top: 35%;
  right: 0px;
  background-color: #fff;
  font-size: 15px;
  color: black;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

  // width: 40px;
  // height: 58px;
  // background-color: #3d3d3d;
  border-radius: 0 10px 10px 0;
  border: 1px solid #e7e9f1;
  border-left: none;
  // border-bottom-right-radius: 10px;
  transform: perspective(20px) rotateX(0deg) rotateY(8deg) translateZ(0);
}
</style>
