/**
 * 搜索相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取搜索提示
 */

export const getSearchSuggestions = (str) => {
  return request({
    methods: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q: str
    }
  })
}

/**
 * 根据用户输入的 关键词 获取搜索结果
 */

export const getSearchResults = (params) => {
  return request({
    methods: 'GET',
    url: '/v1_0/search',
    params
  })
}
