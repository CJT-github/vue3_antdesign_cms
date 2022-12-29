<template>
  <div>
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <template v-for="(item, i) in searchConfig.columns" :key="i">
          <a-col v-show="expand || i <= 6" :span="8">
            <a-form-item
              :name="item.item_name"
              :label="item.label"
              :rules="item.rules"
            >
              <template v-if="item.timePicker ? true : false">
                <a-range-picker
                  v-model:value="timeState[item.item_name]"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else>
                <a-input
                  v-model:value="formState[item.item_name]"
                  :placeholder="item.placeholder"
                ></a-input>
              </template>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="() => formRef.resetFields()"
            >清除</a-button
          >
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand"> <UpOutlined />&nbsp;关闭</template>
            <template v-else> <DownOutlined />&nbsp;展开</template>
          </a>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  props: {
    searchConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    DownOutlined,
    UpOutlined,
  },
  setup(props) {
    const expand = ref(false);
    const formRef = ref();
    const formState = reactive({});
    const timeState = reactive({});
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
      console.log("formState: ", formState);
      console.log("timeState", timeState);
    };
    return {
      formRef,
      formState,
      timeState,
      expand,
      onFinish,
    };
  },
});
</script>
<style>
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
[data-theme="dark"] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
[data-theme="dark"] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}
</style>
