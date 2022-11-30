<template>
  <div class="main">
    <a-layout>
      <!-- 侧边栏 -->
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        collapsedWidth="120px"
      >
        <nav-menu></nav-menu>
      </a-layout-sider>
      <a-layout>
        <!-- 头部区域 -->
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <!-- 主体展示内容 -->
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          Content
          <!-- <component :is="currentTab"></component> -->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import NavMenu from "@/components/nav-menu/src/NavMenu";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    NavMenu,
  },
  setup() {
    return {
      collapsed: ref(false),
    };
  },
});
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
}
</style>
