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
  modules: {
    loginModule
  },
  actions: {
    
  }
})

export default store