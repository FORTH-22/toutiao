/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
// 在非组件模式获取 vuex容器中的 store
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 基础路径
})

// 请求拦截器  用来统一加上 token
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { user } = store.state

    // 如果用户登陆  统一给接口设置 token 信息
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    console.log(config)
    // 设置完成后 一定要返回 config 不然网络请求 就会停在这里
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default request
