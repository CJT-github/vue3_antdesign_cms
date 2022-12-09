import newRequest from '@/service'

const DEPARTMENT_LIST = '/department/list'
const UPDATE_DEPARTMENT = '/department/'
//获取部门列表
export function getDepartmentList(data) {
  return newRequest.post({
    url: DEPARTMENT_LIST, 
    data: {
      ...data
    }
  })
}

//获取某个部门


//创建部门



//更新部门
export function updateDepartment(id,data) {
  return newRequest.patch({
    url: `UPDATE_DEPARTMENT${id}`,
    data: {
      ...data
    }
  })
}

//删除部门