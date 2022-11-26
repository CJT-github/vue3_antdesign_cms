import newRequest from '@/service'

const ACCOUNT_LOGIN = '/login'
const USER_INFO = '/users/'
const USER_MENU = 'role/'

//login请求
export function accountLoginRequest(account) {
  return newRequest.post({
    url : ACCOUNT_LOGIN,
    data : {
      password: account.password,
      name: account.username
    }
  })
}
//user请求
export function accountUserRequest(id) {
  return newRequest.get({
    url: USER_INFO + id
  })
}