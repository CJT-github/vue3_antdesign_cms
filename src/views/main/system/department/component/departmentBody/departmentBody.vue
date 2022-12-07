<template>
  <div class="department-body">
    <page-table :tableConfig="TableConfig" :data="data"></page-table>
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
  componentsL: {
    PageTable,
  },
  setup() {
    const store = useStore();
    const data = computed(() => store.state.departmentModule.departmentList);
    return {
      PageTable,
      data,
      TableConfig,
    };
  },
};
</script>

<style lang="less" scoped></style>
