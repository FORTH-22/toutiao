import Vue from 'vue'
import Vuex from 'vuex'

// 引入封装好的 本地存储 相关方法
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

// 因为user 一般不改 所以搞成常量 而且 这样还有个好处 就是如果 USER_KEY写错了 会报错
// 但是如果  写成 字符串的 user 那么是不会报错的
// 而且可读性 也好
const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 如果用 本地存储 这里也就不用再写死了  而是读出来
    // user: JSON.parse(localStorage.getItem('user'))
    user: getItem(USER_KEY),

    // 要缓存的页面
    cachePages: ['FatherIndex']
  },
  getters: {},
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止页面刷新后 store容器中 user的token 数据消失  这里用 本地存储 仅仅是为了 保存数据  不让数据因为刷新页面 而丢失
      // localStorage.setItem('user', JSON.stringify(data))
      setItem(USER_KEY, data)
    },

    // 添加缓存页面
    addCachePages(state, cachePage) {
      if (!state.cachePages.includes(cachePage)) {
        state.cachePages.push(cachePage)
      }
    },

    // 清除缓存页面
    removeCachePages(state, cachePage) {
      const index = state.cachePages.indexOf(cachePage)

      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
