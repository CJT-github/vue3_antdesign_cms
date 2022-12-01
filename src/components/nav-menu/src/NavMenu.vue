<template>
  <div class="nav-menu">
    <div class="logo" />
    <a-menu
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      style="height: 100%"
    >
      <template v-for="menu in userMenu" :key="menu.id">
        <template v-if="menu.type === 1">
          <a-sub-menu :key="'sub' + menu.id">
            <template #title>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="cmenu in menu.children" :key="cmenu.id">
              <div>
                <a-menu-item
                  :key="'menu' + cmenu.id"
                  @click="menuItemClic(cmenu.url)"
                  >{{ cmenu.name }}</a-menu-item
                >
              </div>
            </template>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="'menu' + menu.id">{{ menu.name }}</a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    //菜单选项
    const store = useStore();
    const userMenu = computed(() => store.state.loginModule.userMenus);
    // console.log(userMenu);
    //点击时跳转
    const menuItemClic = (url) => {
      router.push(url);
    };
    return {
      selectedKeys: ref(["39"]),
      openKeys: ref(["sub38"]),
      userMenu,
      menuItemClic,
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
