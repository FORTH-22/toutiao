/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章内容
 */

export const getArticles = (params) => {
  return request({
    methods: 'GET',
    url: '/v1_0/articles',
    params
  })
}
