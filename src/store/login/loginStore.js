import router from '@/router'
import { accountLoginRequest,accountUserRequest,getRoleMenus } from '@/service/login/login'
import localCache from '@/utils/localCache'
import {mapMenuToPermissions,getMenuTemplatePath} from '@/utils/map-menu'

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
    changePermissionList(state,permissionList) {
      state.permissionList = permissionList
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
     const menuResult = menuRes.data.data
     context.commit('changeUserMenus',menuResult)
     localCache.setCache('userMenus',menuResult)
    //获取权限信息
     const permission = mapMenuToPermissions(menuResult)
     context.commit('changePermissionList',permission)
     //获取所有信息

     //动态绑定路由
     const routes = getMenuTemplatePath(menuResult)
     routes.forEach((item) => {
      router.addRoute('main',item)
     })
     
     //路由跳转
     router.push('/main')
    },
    //用于用户刷新网页时，vuex重置，导致数据为null问题
    //vuex只保存在浏览器堆栈内，无法做到持久化存储
    uploadAction({commit}) {
      const token = localCache.getCache("token")
      if(token) {
        commit("changeToken",token)
      } else {
        router.push('/')
      }
      const userData = localCache.getCache('userInfo')
      if(userData) {
        commit("changeUserInfo",userData)
      } else {
        router.push('/')
      }
      const menuResult = localCache.getCache('userMenus')
      if(menuResult) {
        commit('changeUserMenus',menuResult)
        //动态绑定路由
        const routes = getMenuTemplatePath(menuResult)
        routes.forEach((item) => {
          // console.log(item)
          router.addRoute('main',item)
        })
      } else {
        router.push('/')
      }
      
    }
  }
}


export default loginModule