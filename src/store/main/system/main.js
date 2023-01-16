import {getUserList} from '@/service/main/system/user.js'
import { getDepartmentList } from "@/service/main/system/department";

const dataList = {
  namespaced: true,
  state() {
    return {
      departmentList: [],
      userList: [],
    }
  },
  mutations: {
    changeDepartmentList(state,payload){
      state.departmentList = payload
    },
    changeUserList(state,payload) {
      state.userList = payload
    }
  },
  actions: {
      //
      //获取列表信息
    async getDepartmentListAction(context,payload) {
      const departmentList = await getDepartmentList(payload)
      context.commit("changeDepartmentList",departmentList.data.data.list)
    },
    //获取查询用户列表信息
    async getUserListAction(context,payload) {
      const userList = await getUserList(payload)
      context.commit('changeUserList',userList.data.data.list)
    },

    async getDataList({commit},payload) {
      const pageName = payload.pageName;
      const pageInfo = payload.pageInfo.value;
      const data = {offset: pageInfo.current - 1,size: pageInfo.pageSize }
      switch(pageName) {
        case "users":
          const userList = await getUserList(data)
          commit('changeUserList',userList.data.data.list)
          break;
        case "department":
          const departmentList = await getDepartmentList(data)
          commit("changeDepartmentList",departmentList.data.data.list)
          break;
      }
    },

  },
  getter:{

  }
}

export default dataList