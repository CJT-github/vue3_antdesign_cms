const department = () => import('@/router/main/system/department/department')

export default {
  path: '/main/system/department',
  name: 'department',
  component: department,
  children: []
}
