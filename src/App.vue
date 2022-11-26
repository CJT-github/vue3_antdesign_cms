<template>
  <div class="app">
    <router-link to="/"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  setup() {
    return {};
  },
};
</script>

<style lang="less">
.app {
}
</style>
