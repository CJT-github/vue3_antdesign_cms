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
      :row-selection="rowSelectionFn(rowSelectionBl)"
    >
      <template #action>
        <a>action</a>
      </template>
      <!-- 处理自定义列标题类型 -->
      <slot name="table_title"></slot>
      <!-- 处理自定义列表格类型 -->
      <slot name="table_column"></slot>
    </a-table>
  </div>
</template>

<script>
import { ref } from "vue";
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
  },
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

    return {
      rowSelectionFn,
    };
  },
};
</script>

<style lang="scss" scoped></style>
