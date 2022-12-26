import {createStore} from 'vuex'
import loginModule from './login/loginStore'
import userModule from './main/system/user'
import departmentModule from './main/system/department'
import mainModule from  './main/system/main'


const store = createStore({
    state() {
      return {
        name: 'chentao',
        // 各个列表数据

      }
    },
    mutations: {

    },
    getters: {

    },
    actions: {

      

    },
    modules: {
      loginModule,
      userModule,
      departmentModule,
      mainModule
    }
  })

  export function updateLoadAction() {
    //刷新的时候，对vuex再次赋值
    store.dispatch('loginModule/uploadAction')
    //缓存所有信息
    store.dispatch('mainModule/getUserListAction') 
    store.dispatch('mainModule/getDepartmentListAction') 
  
  }

export default store