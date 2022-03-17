<template>
  <div>
    <scroll-view
      scroll-y
      style='{{"height: " + (isHaveVideo ? haveVideoHeight : windowHeight) + "px;"}}'
    ></scroll-view>
  </div>
</template>

<script>
export default {
  name: 'css',
  data() {
    return {}
  },
  props: {},
  components: {},
  mounted() {},
  methods: {},
}
</script>

<style></style>
