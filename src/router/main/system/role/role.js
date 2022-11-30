const role = ()  => import('@/router/main/system/role/role')

export default {
  path: '/main/system/role',
  name: 'role',
  component: role,
  children: []
}