import newRequest from '@/service'
//用户管理模块
const USER_LIST = '/users/list'
export function getUserList(data) {
  return newRequest.post({
    url: USER_LIST,
    data: {
      ...data
    }
  })
}