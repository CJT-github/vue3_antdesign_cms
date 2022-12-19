import {createStore} from 'vuex'
import loginModule from './login/loginStore'
import userModule from './main/system/user'
import departmentModule from './main/system/department'
import {getUserList} from '@/service/main/system/user.js'
import { getDepartmentList } from "@/service/main/system/department";

const store = createStore({
    state() {
      return {
        name: 'chentao',
        // 各个列表数据
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
    getters: {

    },
    actions: {
      //获取部门列表信息
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
    modules: {
      loginModule,
      userModule,
      departmentModule
    }
  })

  export function updateLoadAction() {
    //刷新的时候，对vuex再次赋值
    store.dispatch('loginModule/uploadAction')
    //缓存所有信息
    store.dispatch('getUserListAction') 
    store.dispatch('getDepartmentListAction') 
  
  }

export default store