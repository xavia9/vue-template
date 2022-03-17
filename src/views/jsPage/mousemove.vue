<template>
  <div class="mousemove">
    <el-button ref="slider" @mousemove="moveStart">滑块</el-button>
  </div>
</template>

<script>
export default {
  name: 'mousemove',
  components: {},
  data() {
    return {
      originX: 0,
      originY: 0,
      slider: null,
      isMouseDown: false,
      width: 500,
    }
  },
  props: {},
  created() {
    this.slider = this.$refs.slider
  },
  mounted() {},
  methods: {
    moveStart(e) {
      // 获取拖拽起始位置坐标
      this.originX = e.clientX || e.touches[0].clientX
      this.originY = e.clientY || e.touches[0].clientY
      this.isMouseDown = true
      document.onmousemove = (ev) => {
        if (!this.isMouseDown) return false
        const w = this.width
        // 获取拖拽移动的距离
        const eventX = ev.clientX || ev.touches[0].clientX
        const moveX = eventX - this.originX
        if (moveX < 0 || moveX + 40 >= w) return false
        this.slider.style.left = moveX + 'px'
        // this.block.style.left = moveX + 'px'
        // this.sliderMask.style.width = moveX + 'px'
      }
      document.onmouseup = (ev) => {
        if (!this.isMouseDown) return false
        this.isMouseDown = false
        const eventX = ev.clientX || ev.changedTouches[0].clientX
        if (eventX === this.originX) return false
      }
    },
  },
}
</script>

<style></style>
