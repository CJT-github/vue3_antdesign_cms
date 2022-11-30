const goods = () => import( '@/router/main/product/goods/goods')

export default {
  path: '/main/product/goods',
  name: 'goods',
  component: goods,
  children: []
}