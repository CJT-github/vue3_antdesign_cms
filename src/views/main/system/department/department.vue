<template>
  <div>
    <page-search></page-search>
    <department-body></department-body>
  </div>
</template>

<script>
import departmentBody from "./component/departmentBody/departmentBody.vue";
import PageSearch from "@/components/page-table/PageSearch.vue";
export default {
  name: "department",
  components: {
    departmentBody,
    PageSearch,
  },
  setup() {
    return {
      departmentBody,
      PageSearch,
    };
  },
};
</script>

<style lang="scss" scoped></style>
