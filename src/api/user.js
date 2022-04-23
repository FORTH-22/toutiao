/**
 * 用户相关请求 模块
 */

/**
 * 登陆与注册
 */

import request from '@/utils/request'

// 在非组件模式获取 vuex容器中的 store
// import store from '@/store'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}

/**
 * 发送短信验证码
 */

export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取登陆用户个人信息
 */

export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'

    // 现在要用 axios 拦截器 统一加上 header 中的 Authorization 所以就注释掉啦
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 发送短信验证码
 */

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
