<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500, y: 1000 }"
      rowKey="id"
      :row-selection="rowSelection"
    >
      <template #action>
        <a>action</a>
      </template>
      <!-- 处理状态 -->
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'enable'">
          <div v-if="record.enable == 1">
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
    </a-table>
  </div>
</template>

<script>
import columns from "./config";
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const data = computed(() => store.state.userList);

    //处理全选、多选
    const rowSelection = ref({
      checkStrictly: true,
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys);
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log(record);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(changeRows);
      },
    });

    return {
      columns,
      data,
      rowSelection,
    };
  },
};
</script>

<style lang="less" scoped></style>
