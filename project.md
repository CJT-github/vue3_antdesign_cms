## 项目开发

### 一、部署





### 二、开发

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
~~~

