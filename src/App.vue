<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="/table">表格组件</router-link>
    <br />
    <br />
    <router-link to="/time">时间组件</router-link>
    <br />
    <br />
    <router-link to="/date">日期组件</router-link>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>

<style>
</style>
