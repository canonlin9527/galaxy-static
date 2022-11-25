import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd'
import Cookies from 'js-cookie'
import useGlobal from '@/models/global';


// let baseURL = process.env.VUE_APP_BASE_API
let baseURL = '/vapi'
if (process.env.NODE_ENV === 'production') {
  baseURL = `//${location.host}/vapi`
}

const fetchInstance = axios.create({
  baseURL
  // timeout: 2000,
})

// request拦截器
fetchInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  // 额外请求头加信息验证
  // if (useGlobal.token) {
  //   if (config.headers) {
  //     config.headers['DS-Token'] = Cookies.get('DS-Token');
  //   }
  // } else {
  //   if (config.headers) {
  //     config.headers['DS-Token'] = Cookies.get('DS-Token');
  //   }
  // }
  config.withCredentials = true
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// response拦截器
fetchInstance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      message.error(
        res.message, 300
      )
      return Promise.reject('request error')
    } else {
      return response.data
    }
  },
  error => {
    if (error.message !== 'cancel') {
      console.log('err:' + error)// for debug
      message.error(
        error.message, 300
      )
    }
    // Raven.captureException(error)
    return Promise.reject(error)
  }
)

export default fetchInstance
