import {createStore} from 'vuex'
import loginModule from './login/loginStore'
import userModule from './main/system/user'

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
      userModule
    }
  })

  export function updateLoadAction() {
    //刷新的时候，对vuex再次赋值
    store.dispatch('loginModule/uploadAction')
    //缓存所有信息
    store.dispatch('userModule/getUserListAction')  
  }

export default store