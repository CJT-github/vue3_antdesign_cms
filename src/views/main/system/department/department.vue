<template>
  <div>
    <page-search :searchConfig="searchConfig"></page-search>
    <department-body></department-body>
  </div>
</template>

<script>
import searchConfig from "./component/departmentBody/searchConfig";
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
      searchConfig,
    };
  },
};
</script>

<style lang="scss" scoped></style>
