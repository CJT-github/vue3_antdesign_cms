import {createStore} from 'vuex'
import loginModule from './login/loginStore'
import userModule from './main/system/user'
import departmentModule from './main/system/department'

const store = createStore({
    state() {
      return {
        name: 'chentao'
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
      departmentModule
    }
  })

  export function updateLoadAction() {
    //刷新的时候，对vuex再次赋值
    store.dispatch('loginModule/uploadAction')
    //缓存所有信息
    store.dispatch('userModule/getUserListAction') 
    store.dispatch('departmentModule/getDepartmentListAction') 
  }

export default store