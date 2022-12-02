<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500, y: 300 }"
    >
      <template #action>
        <a>action</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import columns from "./config";
export default {
  setup() {
    const data = [];
    return {
      columns,
      data,
    };
  },
};
</script>

<style lang="scss" scoped></style>
