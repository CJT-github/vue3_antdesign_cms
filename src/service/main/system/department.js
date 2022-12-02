import newRequest from '@/service'

const DEPARTMENT_LIST = '/department'
export function getDepartmentList(data) {
  return newRequest.get({
    url: DEPARTMENT_LIST, 
    params: {
      ...data
    }
  })
}