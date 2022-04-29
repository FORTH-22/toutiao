/**
 * 频道相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取所有频道
 */

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

/**
 * 添加用户频道 然后把数据上传 到线上的接口
 */

// 该接口已经 用不了了 暂时不 数据持久化的内容了
// 不不不 不是用不了了哈哈哈  这里不是 请求方法的属性 不是 methods  是method 没有s
// 之前写错了 还以为是接口的问题  原来是我自己的问题
// 还是要认真 看接口文档呀
export const addUserChannel = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data
  })
}

/**
 * 删除用户频道 然后把数据上传到线上的接口
 */
export const deleteUserChannel = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
