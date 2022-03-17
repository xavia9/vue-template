<template>
  <div class="nav-top">
    <el-menu
      :default-active="activeTopMenuItem"
      mode="horizontal"
      @select="selectTopMenu"
      class="h100"
    >
      <el-menu-item
        :index="menuItem.routePath"
        v-for="menuItem in menuTop"
        :key="menuItem.routePath"
      >
        <i :class="menuItem.icon"></i>
        <span slot="title">{{ menuItem.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavTop',
  components: {},
  data() {
    return {
      activeTopMenuItem: '/asyncPage',
    }
  },
  props: {
    menuTop: {
      type: Array,
      required: true,
    },
  },
  watch: {
    '$route.path': {
      handler(newVal, oldval) {
        this.activeTopMenuItem = this.$route.path
        // console.log(this.activeTopMenuItem)
      },
      deep: true,
    },
  },
  created() {
    this.activeTopMenuItem = this.$route.path
    // console.log(this.activeTopMenuItem)
    // console.log(this.menuTop)
  },
  mounted() {},
  methods: {
    // 选择顶部菜单
    selectTopMenu(routePath) {
      if (routePath === this.$route.path) return
      this.$router.push(routePath)
    },
  },
}
</script>

<style>
.nav-top {
  /* height: 100%; */
}
</style>
