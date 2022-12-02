import newRequest from '@/service'
//角色管理
const ROLE_LIST = '/role/list'
export function getRoleList(data) {
  return newRequest.post({
    url: ROLE_LIST,
    data: {
      ...data
    }
  })
}