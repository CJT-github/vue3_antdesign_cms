<template>
  <div class="user">
    <user-body></user-body>
  </div>
</template>

<script>
import userBody from "./component/userbody/userBody.vue";
export default {
  components: {
    userBody,
  },
  name: "user",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
