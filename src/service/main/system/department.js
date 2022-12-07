import newRequest from '@/service'

const DEPARTMENT_LIST = '/department/list'
export function getDepartmentList(data) {
  return newRequest.post({
    url: DEPARTMENT_LIST, 
    data: {
      ...data
    }
  })
}