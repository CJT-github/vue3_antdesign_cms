

## 项目开发

### 一、部署



### 二、流程梳理





### 三、开发

#### 1、封装antdesign

~~~
//创建glabol文件夹=》registerAntDesign.js
import {Button,Form,Input,Checkbox,Layout,Menu} from 'ant-design-vue'
const components = [Button,Form.Item,Input.Password,Input,Checkbox,
  Layout,Layout.Footer,Layout.Content,Layout.Header,Layout.Sider,Menu,Menu.Item]
export default function(app) {
  for(const component of components) {
    app.component(component.name,component)
  }
}
//在babel.config.js文件加入plugins
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
    'import',
    {
      libraryName: 'ant-design-vue',
      libraryDirectory: 'lib',
      style: 'css'
    }
  ]
  ]
}
~~~

#### 2、封装工具包

~~~
//对localStorage封装
class cacheFZ {
  setCache(key,value) {
    window.localStorage.setItem(key,value)
  }
  getCache(key) {
  window.localStorage.getItem(key)
  }
  deleteCache(key) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clearCache()
  }
}
export default new cacheFZ()

~~~



#### 3、封装axios

~~~
import axios from "axios";
import {BASE_URL,TIME_OUT} from '@/service/config'
import localCache from '@/utils/localCache'

const baseURL = BASE_URL
const timeout = TIME_OUT

class newRequest {
  constructor(baseURL,timeout) {
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: timeout
    })
  }
  request(config) {
    //请求拦截
    this.instance.interceptors.request.use((config) => {
      const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NjkyNzM4NDgsImV4cCI6MTY3MTg2NTg0OH0.v-itO5ieiBVCrsCg5JxdYC5cYpws1uTIgKw7IbsUNVucThNb0lHzCuxnjeCvb4gqlTswUJQTSN01o1iNDmGC_plhCrdx4Xk3PprPzMj2jbO9RZV2zxjU2IAnFtFJXTuDoikRVXXkCve8ifr0sdP-3EZWoWi-HRP23EvoPg-Y-bQ'
      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config
    })
    //响应拦截
    this.instance.interceptors.response.use((config) => {
      return config
    })
    return this.instance.request(config)
  }

  get(config) {
    return this.request({...config,method: 'get'})
  }
  post(config) {
    return this.request({...config,method: 'post'})
  }

}
export default new newRequest(baseURL,timeout)
~~~

#### 4、login处理

~~~
//获取token
     const loginResult = await accountLoginRequest(payload)
     const {id,token} = loginResult.data.data
    //  console.log(token)
     context.commit("changeToken",token)
     //缓存token
     localCache.setCache('token',token)
     
//用户信息
     const userResult = await accountUserRequest(id)
     const userData = userResult.data.data
    //  console.log(userData)
     context.commit("changeUserInfo",userData)
     localCache.setCache('userInfo',userData)
     
//获取菜单
     const roleId = userData.role.id
     const menuRes = await  getRoleMenus(roleId)
     const menuResult = menuRes.data
     context.commit('changeUserMenus',menuResult)
     localCache.setCache('userMenus',menuResult)
     
//获取权限信息
     const permission = mapMenuToPermissions(menuResult)
     context.commit('changePermissionList',permission)

//路由跳转首页
     router.push('/main')
~~~

#### 5、方法封装

~~~
//菜单路由映射
let firstMenu = null
//获取菜单模板路径
export function getMenuTemplatePath(useMenus) {
  const routes = []
  //加载所有模板
  const allRoutes = []
  //获取@/router/main下所有的js文件路径
  const roleFile = require.context('@/router/main',true,/\.js$/);
  roleFile.keys().forEach((filePath) => {
    //获取文件内容
    const routeModule = require('@/router/main' + filePath.split('.')[1])
    allRoutes.push(routeModule.default)
  })
  //获取可以点击的url
  function findRouteFun(useMenu) {
    for(const menu of useMenu) {
      if(menu.type === 1) {
        findRouteFun(menu.children)
      }else if(menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url)
        if(route) {
          if(!firstMenu) {
            firstMenu = menu
          }
          routes.push(route)
        }
      }
    }
  }
  findRouteFun(useMenus)
  console.log(routes)
  return routes
}

//处理用户权限信息
export function mapMenuToPermissions(userMenus) {
  const permissionList = []
  const userMenusArray = userMenus.data
  //这里采用了闭包
  function _mapMenuToPermissions(userMenusArray) {
    for(const menu of userMenusArray) {
      if(menu.type === 1 || menu.type === 2) {
        _mapMenuToPermissions(menu.children ?? [])
      } else {
        permissionList.push(menu.permission)
      }
    }
  }
  _mapMenuToPermissions(userMenusArray)
  return permissionList
}

~~~

#### 6、主页侧边栏处理

~~~
//需要拿到菜单信息，方案：菜单只考虑二级显示，路由动态添加
<template>
  <div class="nav-menu">
    <div class="logo" />
    <a-menu
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      style="height: 100%"
    >
      <template v-for="menu in userMenu" :key="menu.id">
        <template v-if="menu.type === 1">
          <a-sub-menu :key="'sub' + menu.id">
            <template #title>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="cmenu in menu.children" :key="cmenu.id">
              <div>
                <a-menu-item
                  :key="'menu' + cmenu.id"
                  @click="menuItemClic(cmenu.url)"
                  >{{ cmenu.name }}</a-menu-item
                >
              </div>
            </template>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="'menu' + menu.id">{{ menu.name }}</a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>
~~~

#### 7、权限处理

~~~
import { useStore } from "vuex";

export function usePermission(pageName,action) {
  const store = useStore()
  const permissionList = store.state.loginModule.permissionList
  const permission = `system:${pageName}:${action}`
  return !!permissionList.find((item) => item === permission)
}
~~~

#### 8、用户管理模块

~~~
//用户列表渲染
//用户列表状态渲染
  {
    title: '状态',
    dataIndex: 'enable',
    key: 'enable',
    width: 150,
    align: 'center',
    dataIndex: 'enable'
  },
  =============================================
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
~~~

#### 9、utc时间格式处理

~~~
安装:npm install dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc) //dayjs扩展支持utc
export function formUtcString(utcString,DATE_TIME_FORMAT) {
  if(!DATE_TIME_FORMAT) {
    DATE_TIME_FORMAT="YYYY-MM-DD HH:mm:ss"
  } 
  return dayjs.utc(utcString).format(DATE_TIME_FORMAT)
}
~~~

#### 10、处理全选及多选

~~~
 //table标签添加
       rowKey="id"
      :row-selection="rowSelection"
 
 
 //处理全选、多选
    const rowSelection = ref({
      checkStrictly: true,
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(
        //   `all_id: ${selectedRowKeys}`,
        //   "all_message: ",
        //   selectedRows
        // );
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
      },
    });
~~~

#### 11、处理表格与搜索联动

~~~

~~~

#### 12、表格再次封装

~~~
<template>
  <div class="mis-table">
    <div class="header">
      <!-- 表格标题 -->
      <slot name="title">
        <div class="title">
          <h2>{{ title }}</h2>
        </div>
        <!-- 表格头部靠右的操作 -->
        <div class="operation">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格主体 -->
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="scrollXY"
      :rowKey="rowKeyId"
      :row-selection="rowSelection"
    >
      <template #action>
        <a>action</a>
      </template>
      <!-- 处理自定义列标题类型 -->
      <slot name="table_title"></slot>
      <!-- 处理自定义列表格类型 -->
      <slot name="table_column"></slot>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "MsiTable",
  props: {
    title: {
      type: String,
      default: "title",
    },
    columns: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    scrollXY: {
      type: Object,
      default: { x: 1500, y: 1000 },
    },
    rowKeyId: {
      type: String,
      default: "id",
    },
    rowSelectionBl: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const rowSelection = null;
    if (props.rowSelectionBl) {
      //处理全选、多选
      rowSelection = ref({
        checkStrictly: true,
        onChange: (selectedRowKeys, selectedRows) => {
          //点击动作发生时触发
          //selectedRowKeys 返回id
          emit("onChangeId", selectedRowKeys);
          //selectedRows 返回proxy
          emit("onChangeArray", selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
          //多选或者单选触发
          // record 当前点击返回proxy
          emit("onSelectProxy", record);
          // selected 返回 boolean
          emit("onSelectBoolean", selected);
          // selectedRows 所有选中的返回proxy数组
          emit("onSelectArray", selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          //全选触发
          // selected 返回boolean
          emit("onSelectAllBoolean", selected);
          // selectedRows 所有选中的返回proxy数组
          emit("selectedRowsArray", selectedRows);
          // changeRows 所有选中取消的返回proxy数组
          emit("changeRowsArray", changeRows);
        },
      });
    }

    return {
      rowSelection,
    };
  },
};
</script>

<style lang="scss" scoped></style>

~~~

#### 13、搜索栏再次封装

~~~
解决没有a-range-picket
https://blog.csdn.net/qq_42120254/article/details/89553174
~~~

#### 14、分页处理

~~~
~~~

