import {createRouter,createWebHashHistory} from 'vue-router'
import localCache from '@/utils/localCache'
import {firstMenu } from '@/utils/map-menu'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  }
]


const router = createRouter({
  routes,
  history: createWebHashHistory()
})


//导航守卫
router.beforeEach((to,from) => {
  if(to.path !== "/login") {
    if(!localCache.getCache('token')) {
      return "/login"
    }
  }

  if (to.path === "/main") {
    return firstMenu.url;
  }
})
export default router