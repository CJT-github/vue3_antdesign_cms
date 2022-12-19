<template>
  <div class="page-table">
    <msi-table :="tableConfig" :data="data" v-model:page="pageName">
      <template #headerHandler>
        <a-button v-if="isCreate">新建数据</a-button>
      </template>
      <template #operation="slotProps">
        <div class="btn">
          <a-button v-if="isDelete">删除</a-button>
          <a-button v-if="isUpdate">修改</a-button>
        </div>
      </template>
    </msi-table>
  </div>
</template>

<script>
import MsiTable from "@/comment-ui/table-ui/MsiTable.vue";
import { ref } from "@vue/reactivity";
import { usePermission } from "@/hook/permission";
import { watch } from "@vue/runtime-core";
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
    pageName: {
      type: String,
      default: "",
    },
    usePermission: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    MsiTable,
  },
  setup(props, { emit }) {
    //权限处理
    const isQuery = usePermission(props.pageName, "query");
    const isUpdate = usePermission(props.pageName, "update");
    const isCreate = usePermission(props.pageName, "create");
    const isDelete = usePermission(props.pageName, "delete");

    //当点击分页时
    const pageInfo = ref({ pageSize: 10, current: 1 });
    watch(pageInfo, () => {
      getDataList;
    });
    //数据申请
    const getDataList = function () {};

    const pageName = ref({ pageSize: 10, current: 1 });
    return {
      MsiTable,
      pageName,
      isDelete,
      isQuery,
      isUpdate,
      isCreate,
    };
  },
};
</script>

<style lang="less" scoped></style>
