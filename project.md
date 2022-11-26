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

