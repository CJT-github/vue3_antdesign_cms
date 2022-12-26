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
      //获取部门列表信息
      //获取列表信息
      async getDataList({commit},payload) {
        
      },
      async getDepartmentListAction(context,payload) {
        const departmentList = await getDepartmentList(payload)
        context.commit("changeDepartmentList",departmentList.data.data.list)
      },
      //获取查询用户列表信息
      async getUserListAction(context,payload) {
        const userList = await getUserList(payload)
        context.commit('changeUserList',userList.data.data.list)
      }
  },
  getter:{

  }
}

export default dataList