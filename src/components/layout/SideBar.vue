<template>
  <div class="side-bar" :style="toggleContainer">
    <el-aside :width="isCollapse ? '55px' : '172px'" class="h100 bgc-fff">
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
    <div class="toggle-button" @click="toggleCollapse">|||</div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  components: {},
  data() {
    return {
      activeMenuItem: '',
      isCollapse: false,
      toggleContainer: {
        width: '200px',
      },
    }
  },
  props: {
    menuList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    '$route.path': {
      handler(newVal, oldval) {
        this.activeMenuItem = this.$route.path
      },
      deep: true,
    },
  },
  computed: {},
  created() {
    this.activeMenuItem = this.$route.path
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // 选择侧边栏（可能涉及权限控制）
    selectSideMenu(routePath) {
      if (routePath === this.$route.path) return
      this.$router.push(routePath)
    },
    // 点击折叠按钮切换bool值
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        // this.toggleContainer = {
        //   width: '68px',
        //   'margin-right': '20px',
        // }

        this.toggleContainer.width = '83px'
      } else {
        // toggleContainer = {
        //   width: '240px',
        // }
        this.toggleContainer.width = '200px'
      }
    },
  },
}
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
  transition: all 0.5s;
}
.toggle-button {
  width: 30px;
  height: 58px;
  line-height: 50px;
  border-radius: 0 10px 10px 0;
  position: absolute;
  top: 50%;
  right: 8px;
  z-index: 6;
  background-color: #fff;
  font-size: 15px;
  color: black;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
