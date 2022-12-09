import { useStore } from "vuex";

export function usePermission(pageName,action) {
  const store = useStore()
  const permissionList = store.state.loginModule.permissionList
  const permission = `system:${pageName}:${action}`
  return !!permissionList.find((item) => item === permission)
}