import { getDepartmentList } from "@/service/main/system/department";

const departmentModule = {
  namespaced: true,
  state(){
    return {
      departmentList: []
    }
  },
  mutations: {
    changeDepartmentList(state,payload){
      state.departmentList = payload
    }
  },
  actions: {
    async getDepartmentListAction(context,payload) {
      const departmentList = await getDepartmentList(payload)
      context.commit("changeDepartmentList",departmentList.data.data.list)
    }
  }, 
  getters: {},


}

export default departmentModule