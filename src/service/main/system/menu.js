import newRequest from '@/service'
//菜单管理
const MENU_LIST = '/menu'
export function getMenuList() {
  return newRequest.get({
    url: MENU_LIST
  })
}