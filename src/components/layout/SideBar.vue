<template>
  <div class="side-bar">
    <el-menu
      :default-active="activeMenuItem"
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
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  components: {},
  data() {
    return {
      activeMenuItem: '',
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
  },
}
</script>

<style>
.side-bar {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.menu-item {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
