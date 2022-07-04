// import Vue from "vue";
// import router from "@/router/index";
import store from '@/store'
// import baseURL from './api.js'
import axios from 'axios'
import { Message, Loading } from 'element-ui'

let ajaxCount = 0
const configCodes = {
  success: '0000',
  failure: '9999',
  repetiton: '7777',
  notLogin: '1111',
}
// const baseURL = 'http://192.168.230.63:8000/ruleEngin'
// const baseURL = process.env.VUE_APP_BASE_API
// const baseURL = '/ruleEngin' //使用代理解决跨域时修改为该路径

// const getBaseUrl = () => {
//   let baseURL = ''
//   if (
//     process.env.NODE_ENV === 'development' &&
//     process.env.VUE_APP_MOCK_ENABLE === 'true'
//   ) {
//     baseURL = '' //使用mock模拟数据时
//   }
//   baseURL = process.env.VUE_APP_BASE_API
//   return baseURL
// }

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

instance.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers.token = store.state.token || ''
    // config.headers.token = '123'
    ajaxCount++
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const mockInterceptors = (res) => {
  if (res.status === 200) {
    return res.data
  } else {
    Message.error(res)
    return Promise.reject(res)
  }
}
const onlineInterceptors = () => {
  const { code, msg } = res.data
  ajaxCount--
  if (!ajaxCount) {
  }
  if (code === configCodes.notLogin) {
    Message.error(msg)
    setTimeout(() => {
      window.location.href = '/#/login'
    }, 1000)
  } else if (code === configCodes.success) {
    return res.data
  } else if (code === configCodes.failure) {
    Message.error(msg)
  } else if (code === configCodes.repetiton) {
    Message.warning(msg)
    return res.data
  } else if (res.config.responseType === 'blob') {
    // 下载文件时用于获取文件名
    return res
  }
}
instance.interceptors.response.use(
  (res) => {
    if (process.env.VUE_APP_MOCK_ENABLE === 'true') {
      return mockInterceptors(res)
    } else if (['production', 'development'].includes(process.env.NODE_ENV)) {
      return onlineInterceptors(res)
    }
  },
  (error) => {
    ajaxCount--
    return Promise.reject(error)
  }
)
export default instance
