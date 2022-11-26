import router from '@/router'
import { accountLoginRequest,accountUserRequest } from '@/service/login/login'
import localCache from '@/utils/localCache'

const loginModule = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissionList: []
    }
  },
  mutations: {
    changeToken(state,payload) {
      state.token = payload.token
    },
    changeUserInfo(state,payload) {
      state.userInfo = payload.userInfo
    },
    changeUserMenus(state,payload) {
      state.userMenus = payload.userMenus
    },
    changePermissionList(state,payload) {
      state.permissionList = payload.permissionList
    }
  },
  actions: {
    async accountLoginAction(context,payload) {
    //登录信息
     const loginResult = await accountLoginRequest(payload)
     const {id,token} = loginResult.data.data
     console.log(token)
     context.commit("changeToken",token)
     //缓存token
     localCache.setCache('token',token)
     //用户信息
     const userResult = await accountUserRequest(id)
     const userData = userResult.data.data
     console.log(userData)
     //路由跳转
     router.push('/main')
    }
  }
}


export default loginModule