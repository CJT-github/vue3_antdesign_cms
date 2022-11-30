const category = () => import('@/router/main/product/category/category')

export default {
  path: '/main/product/category',
  name: 'category',
  component: category,
  children: []
}