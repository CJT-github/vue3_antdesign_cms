<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500, y: 500 }"
    >
      <template #action>
        <a>action</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import columns from "./config";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
// import { formUtcString } from "@/utils/timeForMate";

export default {
  setup() {
    const store = useStore();
    const data = computed(() => store.state.userModule.userList);
    // console.log(formUtcString("2021-08-20T04:07:23.000Z"));
    return {
      columns,
      data,
    };
  },
};
</script>

<style lang="less" scoped></style>
