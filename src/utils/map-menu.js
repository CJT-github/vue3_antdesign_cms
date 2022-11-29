//菜单路由映射
//获取菜单模板路径
function getMenuTemplatePath() {
  //加载所有模板
  // const moudle = import.meta.glob('')
}
//获取接口提供的路径



//处理用户权限信息
export function mapMenuToPermissions(userMenus) {
  const permissionList = []
  const userMenusArray = userMenus.data
  //这里采用了闭包
  function _mapMenuToPermissions(userMenusArray) {
    for(const menu of userMenusArray) {
      if(menu.type === 1 || menu.type === 2) {
        _mapMenuToPermissions(menu.children ?? [])
      } else {
        permissionList.push(menu.permission)
      }
    }
  }
  _mapMenuToPermissions(userMenusArray)
  return permissionList
}