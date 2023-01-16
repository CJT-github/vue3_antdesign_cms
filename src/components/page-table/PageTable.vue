<template>
  <div class="page-table">
    <msi-table :="tableConfig" :data="data" v-model:page="pageInfo">
      <template #headerHandler>
        <a-button v-if="isCreate">新建数据</a-button>
      </template>
      <!-- 序列号 -->
      <template #count="slotProps">
        <div class="num">{{ slotProps.index + 1 }}</div>
      </template>
      <template #operation="slotProps">
        <div class="btn">
          <a-button v-if="isDelete">删除</a-button>
          <a-button v-if="isUpdate">修改</a-button>
        </div>
      </template>
      <template #enable="slotProps">
        <!-- 处理状态 -->
        <template v-if="slotProps.column.dataIndex == 'enable'">
          <div v-if="slotProps.record.enable == 1">
            <span
              style="
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: blue;
              "
            ></span>
          </div>
          <div v-else>
            <span
              style="
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: red;
              "
            ></span>
          </div>
        </template>
      </template>
    </msi-table>
  </div>
</template>

<script>
import MsiTable from "@/comment-ui/table-ui/MsiTable.vue";
import { ref } from "@vue/reactivity";
import { usePermission } from "@/hook/permission";
import { watch } from "@vue/runtime-core";
import { watchEffect, toRefs, toRef } from "vue";
import store from "@/store";
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
    const pageName = props.pageName;
    const isQuery = usePermission(pageName, "query");
    const isUpdate = usePermission(pageName, "update");
    const isCreate = usePermission(pageName, "create");
    const isDelete = usePermission(pageName, "delete");
    // console.log(isQuery, isUpdate, isCreate, isDelete);

    //当点击分页时
    const pageInfo = ref({ pageSize: 10, current: 1 });
    watch(
      pageInfo,
      () => {
        getDataList({ pageName, pageInfo });
        console.log("触发分页");
      },
      { deep: true }
    );
    //数据申请
    const getDataList = function (queryInfo) {
      if (!isQuery && props.usePermission) return;
      store.dispatch("mainModule/getDataList", { ...queryInfo });
    };
    getDataList({ pageName, pageInfo });

    return {
      MsiTable,
      pageInfo,
      isDelete,
      isQuery,
      isUpdate,
      isCreate,
    };
  },
};
</script>

<style lang="less" scoped></style>
