<template>
  <div class="nav-menu">
    <div class="logo" />
    <a-menu
      mode="inline"
      v-model:selectedKeys="selectedKeys2"
      v-model:openKeys="openKeys"
      style="height: 100%"
    >
      <template v-for="menu in userMenu" :key="menu.id">
        <template v-if="menu.id == 38 || menu.id == 41">
          <a-sub-menu :key="'sub' + menu.id">
            <template #title>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="cmenu in menu.children" :key="cmenu.id">
              <div>
                <a-menu-item :key="'menu' + cmenu.id">{{
                  cmenu.name
                }}</a-menu-item>
              </div>
            </template>
          </a-sub-menu>
        </template>
        <template v-else>
          <template v-for="cmenu in menu.children" :key="cmenu.id">
            <template v-if="cmenu">
              <a-sub-menu :key="'sub' + cmenu.id">
                <template #title>
                  <span>{{ cmenu.name }}</span>
                </template>
                <template v-for="menu in cmenu.children" :key="menu.id">
                  <template v-if="menu">
                    <a-menu-item :key="'menu' + menu.id">{{
                      menu.name
                    }}</a-menu-item></template
                  >
                </template>
              </a-sub-menu></template
            >
          </template>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    //菜单选项
    const store = useStore();
    const userMenu = store.state.loginModule.userMenus;
    console.log(store);
    return {
      selectedKeys: ref(["1"]),
      selectedKeys1: ref(["2"]),
      selectedKeys2: ref(["1"]),
      openKeys: ref(["sub1"]),
      userMenu,
    };
  },
});
</script>

<style lang="less" scoped>
.nav-menu {
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
}
</style>
