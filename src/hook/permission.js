import { useStore } from "vuex";

// 用于权限处理 返回boolean值
export function usePermission(pageName,action) {
  const store = useStore()
  const permissionList = store.state.loginModule.permissionList
  const permission = `system:${pageName}:${action}`
  return !!permissionList.find((item) => item === permission)
}