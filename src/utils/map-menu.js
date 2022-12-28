//菜单路由映射

let firstMenu = null
//获取菜单模板路径
export function getMenuTemplatePath(useMenus) {
  const routes = []
  //加载所有模板
  const allRoutes = []
  //获取@/router/main下所有的js文件路径
  const roleFile = require.context('@/router/main',true,/\.js$/);
  roleFile.keys().forEach((filePath) => {
    //获取文件内容
    // console.log(filePath);
    const routeModule = require('@/router/main' + filePath.split('.')[1])
    // console.log(routeModule);
    allRoutes.push(routeModule.default)
  })
  //获取可以点击的url
  function findRouteFun(useMenu) {
    for(const menu of useMenu) {
      if(menu.type === 1) {
        findRouteFun(menu.children)
      }else if(menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url)
        if(route) {
          if(!firstMenu) {
            firstMenu = menu
          }
          routes.push(route)
        }
      }
    }
  }
  findRouteFun(useMenus)
  // console.log(routes)
  return routes
}




//处理用户权限信息
export function mapMenuToPermissions(userMenus) {
  const permissionList = []
  const userMenusArray = userMenus
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

export {firstMenu}