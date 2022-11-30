import {createStore} from 'vuex'
import loginModule from './login/loginStore'

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
      loginModule
    }
  })

  export function updateLoadAction() {
    console.log("================")
    store.dispatch('loginModule/uploadAction')  
  }

export default store