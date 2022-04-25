/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */

export const getArticles = (params) => {
  return request({
    methods: 'GET',
    url: '/v1_0/articles',
    params
  })
}

/**
 * 获取每篇文章的 具体正文
 */

export const getArticlesContents = (articleId) => {
  return request({
    methods: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
