//用户管理模块
import {getUserList} from '@/service/main/system/user.js'
const userModule = {
  namespaced: true,
  state() {
    return {
      //接收查询用户列表信息
      userList: []
    }
  },
  mutations: {
    changeUserList(state,payload) {
      state.userList = payload
    }
  },
  actions: {
    //获取查询用户列表信息
    async getUserListAction(context,payload) {
      const userList = await getUserList(payload)
      context.commit('changeUserList',userList.data.data.list)
    }
  },
  getter: {

  }
}

export default userModule