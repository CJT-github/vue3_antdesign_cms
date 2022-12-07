<template>
  <div class="page-table">
    <msi-table :="tableConfig" :data="data"></msi-table>
  </div>
</template>

<script>
import MsiTable from "@/comment-ui/table-ui/MsiTable.vue";
export default {
  name: "PageTable",
  props: {
    tableConfig: {
      type: Object,
      require: true,
    },
    data: {
      type: Array,
      require: true,
    },
  },
  components: {
    MsiTable,
  },
  setup(props, { emit }) {
    return {
      MsiTable,
    };
  },
};
</script>

<style lang="less" scoped></style>
