<template>
  <div class="mis-table">
    <div class="header">
      <!-- 表格标题 -->
      <slot name="title">
        <div class="title">
          <h2>{{ title }}</h2>
        </div>
        <!-- 表格头部靠右的操作 -->
        <div class="operation">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格主体 -->
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="scrollXY"
      :rowKey="rowKeyId"
      :pagination="false"
      :row-selection="rowSelectionFn(rowSelectionBl)"
    >
      <template #action>
        <a>action</a>
      </template>
      <!-- 处理自定义列标题类型 -->
      <slot name="table_title"></slot>
      <!-- 处理自定义列表格类型 -->
      <template v-slot:bodyCell="{ column, record, index }">
        <slot
          :name="column.dataIndex"
          :column="column"
          :record="record"
          :index="index"
        ></slot>
      </template>
    </a-table>
    <div class="footer">
      <div class="pagination">
        <a-pagination
          v-model:current="current"
          v-model:page-size="pageSize"
          :page-size-options="pageSizeOptions"
          :total="total"
          show-size-changer
          @showSizeChange="onShowSizeChange"
        >
          <template #buildOptionText="props">
            <span v-if="props.value !== '30'">{{ props.value }}条/页</span>
            <span v-else>全部</span>
          </template>
        </a-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  name: "MsiTable",
  props: {
    title: {
      type: String,
      default: "title",
    },
    columns: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    scrollXY: {
      type: Object,
      default: { x: 1500, y: 1000 },
    },
    rowKeyId: {
      type: String,
      default: "id",
    },
    rowSelectionBl: {
      type: Boolean,
      default: false,
    },
    paginationBl: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      default: 10,
    },
    page: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:page"],
  setup(props, { emit }) {
    //处理全选、多选
    const rowSelectionFn = function (Bl) {
      if (Bl) {
        const rowSelection = ref({
          checkStrictly: true,
          onChange: (selectedRowKeys, selectedRows) => {
            //点击动作发生时触发
            //selectedRowKeys 返回id
            emit("onChangeId", selectedRowKeys);
            //selectedRows 返回proxy
            emit("onChangeArray", selectedRows);
          },
          onSelect: (record, selected, selectedRows) => {
            //多选或者单选触发
            // record 当前点击返回proxy
            emit("onSelectProxy", record);
            // selected 返回 boolean
            emit("onSelectBoolean", selected);
            // selectedRows 所有选中的返回proxy数组
            emit("onSelectArray", selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            //全选触发
            // selected 返回boolean
            emit("onSelectAllBoolean", selected);
            // selectedRows 所有选中的返回proxy数组
            emit("selectedRowsArray", selectedRows);
            // changeRows 所有选中取消的返回proxy数组
            emit("changeRowsArray", changeRows);
          },
        });
        return rowSelection;
      } else {
        return null;
      }
    };
    //分页器处理
    const pageSizeOptions = ref(["10", "20", "30"]);
    const current = ref(props.page.current);
    const pageSizeRef = ref(props.page.pageSize);
    const total = ref(props.total);
    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
      pageSizeRef.value = pageSize;
    };
    return {
      rowSelectionFn,
      pageSizeOptions,
      current,
      pageSize: pageSizeRef,
      total,
      onShowSizeChange,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  margin-bottom: 20px;
  // background-color: #ccc;
  .title {
    h2 {
      font-weight: bold;
    }
  }
  .operation {
    position: absolute;
    right: 5px;
    top: 0;
    bottom: 0;
  }
}
.footer {
  // position: relative;
  margin-top: 10px;
  .pagination {
    // position: absolute;
    // right: 10px;
    float: right;
  }
}
</style>
