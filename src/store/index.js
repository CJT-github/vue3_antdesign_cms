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
    store.dispatch('loginModule/uploadAction')  
  }

export default store