let TIME_OUT = 10000
let BASE_URL = ''
//不同环境下的请求路径
if(process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000'
  TIME_OUT = 10000
} else if(process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
  TIME_OUT = 10000
} else {
  BASE_URL = ''
}


export {TIME_OUT,BASE_URL}