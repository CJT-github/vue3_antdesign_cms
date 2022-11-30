const user = () => import('@/router/main/system/user/user')

export default {
  path: '/main/system/user',
  name: 'user',
  component: user,
  children: []
}