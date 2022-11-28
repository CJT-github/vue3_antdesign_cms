import router from '@/router'
import { accountLoginRequest,accountUserRequest,getRoleMenus } from '@/service/login/login'
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
    changeToken(state,token) {
      state.token = token
    },
    changeUserInfo(state,userData) {
      state.userInfo = userData
    },
    changeUserMenus(state,menuResult) {
      state.userMenus = menuResult
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
     console.log(menuRes)
     const menuResult = menuRes.data
     context.commit('changeUserMenus',menuResult)
     localCache.setCache('userMenus',menuResult)
    //获取权限信息
     
     //路由跳转
     router.push('/main')
    }

  }
}


export default loginModule