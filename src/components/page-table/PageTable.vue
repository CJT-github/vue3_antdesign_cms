<template>
  <div class="page-table">
    <msi-table :="tableConfig" :data="data" v-model:page="pageName">
      <template #headerHandler>
        <a-button>新建数据</a-button>
      </template>
      <template #operation="slotProps">
        <div class="btn">
          <a-button>删除</a-button>
          <a-button>修改</a-button>
        </div>
      </template>
    </msi-table>
  </div>
</template>

<script>
import MsiTable from "@/comment-ui/table-ui/MsiTable.vue";
import { ref } from "@vue/reactivity";
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
    const pageName = ref({ pageSize: 10, current: 1 });
    return {
      MsiTable,
      pageName,
    };
  },
};
</script>

<style lang="less" scoped></style>
