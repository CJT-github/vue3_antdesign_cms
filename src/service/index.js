import axios from "axios";
import {BASE_URL,TIME_OUT} from '@/service/config'
import localCache from '@/utils/localCache'

const baseURL = BASE_URL
const timeout = TIME_OUT

class newRequest {
  constructor(baseURL,timeout) {
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: timeout
    })
  }
  request(config) {
    //请求拦截
    this.instance.interceptors.request.use((config) => {
      const token = localCache.getCache('token')
      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config
    })
    //响应拦截
    this.instance.interceptors.response.use((config) => {
      return config
    })
    return this.instance.request(config)
  }

  get(config) {
    return this.request({...config,method: 'get'})
  }
  post(config) {
    return this.request({...config,method: 'post'})
  }
  patch(config) {
    return this.request({...config,method: 'patch'})
  }

}

export default new newRequest(baseURL,timeout)