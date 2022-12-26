<template>
  <div class="user-body">
    <page-table
      :tableConfig="TableConfig"
      :data="data"
      :pageName="pageName"
      :usePermission="usePermission"
    ></page-table>
  </div>
</template>

<script>
import PageTable from "@/components/page-table/PageTable.vue";
import TableConfig from "./config";
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  name: "UserBody",
  components: {
    PageTable,
  },
  setup() {
    const store = useStore();
    const data = computed(() => store.state.mainModule.userList);

    const pageName = "users";
    const usePermission = true;

    return {
      PageTable,
      data,
      pageName,
      usePermission,
      TableConfig,
    };
  },
};
</script>

<style lang="less" scoped></style>
