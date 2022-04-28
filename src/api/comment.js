/**
 * 文章评论相关模块
 */

import request from '@/utils/request'
/**
 * 获取文章评论数据
 */
export const getArticleComments = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

/**
 * 对评论或评论回复点赞
 */
export const addCommentLike = (commentId) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

/**
 * 用户取消点赞 评论
 */
export const cancelCommentLike = (commentId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${commentId}`
  })
}

/**
 * 对文章或者评论进行评论
 */
export const publishComment = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
