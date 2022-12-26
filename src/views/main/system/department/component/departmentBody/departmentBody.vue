<template>
  <div class="department-body">
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
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "DepartmentBody",
  components: { PageTable },
  setup() {
    const store = useStore();
    const data = computed(() => store.state.mainModule.departmentList);
    const pageName = "department";
    const usePermission = true;
    return {
      PageTable,
      pageName,
      usePermission,
      data,
      TableConfig,
    };
  },
};
</script>

<style lang="less" scoped></style>
