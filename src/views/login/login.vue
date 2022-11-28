<template>
  <div class="login">
    <img class="index_img" src="@/assets/index.jpg" alt="" />
    <div class="login-form">
      <div class="form">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="账号"
            name="username"
            :rules="[{ required: true, message: '请输入账号!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember"
              >记住密码</a-checkbox
            >
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit" @click="submitAccount"
              >登录</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const formState = reactive({
      username: "",
      password: "",
      remember: false,
    });
    // console.log(process.env.NODE_ENV);
    const onFinish = (values) => {
      console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const store = useStore();
    console.log(store.state.name);
    const submitAccount = function () {
      store.dispatch("loginModule/accountLoginAction", { ...formState });
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
      submitAccount,
    };
  },
});
</script>
<style lang="less" scoped>
// .login {
//   margin: 100px auto;
//   width: 80%;
// }
.login {
  position: relative;
  .index_img {
    width: 100%;
    height: 936px;
  }
  .login-form {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    width: 500px;
    height: 350px;
    right: 300px;
    top: 200px;
    .form {
      margin: 100px 100px 100px 20px;
      width: 400px;
    }
  }
}
</style>
