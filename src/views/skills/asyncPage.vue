<template>
  <div class="async-page">
    <component v-for="(item, index) in compList" :is="item.app" :key="index" />
    <div class="bgc-blue">csdfesdfwe</div>
  </div>
</template>

<script>
export default {
  name: 'asyncPage',
  components: {},
  data() {
    return {
      FileNameArr: ['testComp1', 'testComp2'],
      compList: [],
    }
  },
  props: {},
  created() {
    this.loadComp()
  },
  mounted() {},
  methods: {
    loadComp() {
      this.compList = this.FileNameArr.map((fileName) => {
        return {
          app: () =>
            import(
              /* webpackChunkName: "async_component" */ `./comp/${fileName}.vue`
            ),
        }
      })
      // this.FileNameArr.forEach((app) => {
      //   this.compList.push({ app: () => import(`./comp/${app}.vue`) })
      // })
    },
  },
}
</script>

<style lang="scss">
.async-page {
  background-color: red;
  .bgc-blue {
    background-color: blue;
  }
}
</style>
