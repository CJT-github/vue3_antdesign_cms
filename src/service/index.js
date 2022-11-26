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
      const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NjkyNzM4NDgsImV4cCI6MTY3MTg2NTg0OH0.v-itO5ieiBVCrsCg5JxdYC5cYpws1uTIgKw7IbsUNVucThNb0lHzCuxnjeCvb4gqlTswUJQTSN01o1iNDmGC_plhCrdx4Xk3PprPzMj2jbO9RZV2zxjU2IAnFtFJXTuDoikRVXXkCve8ifr0sdP-3EZWoWi-HRP23EvoPg-Y-bQ'
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

}

export default new newRequest(baseURL,timeout)