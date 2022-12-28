<template>
  <div class="page-search">
    <mis-search :searchConfig="searchConfig"></mis-search>
  </div>
</template>

<script>
import MisSearch from "@/comment-ui/table-ui/MisSearch.vue";
export default {
  name: "pageSearch",
  props: {
    searchConfig: {
      type: Object,
      required: true,
    },
  },
  components: { MisSearch },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.page-search {
  margin: 30px;
}
</style>
