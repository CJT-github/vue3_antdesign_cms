<template>
  <div>
    <department-body></department-body>
  </div>
</template>

<script>
import departmentBody from "./component/departmentBody/departmentBody.vue";
export default {
  name: "department",
  components: {
    departmentBody,
  },
  setup() {
    return {
      departmentBody,
    };
  },
};
</script>

<style lang="scss" scoped></style>
