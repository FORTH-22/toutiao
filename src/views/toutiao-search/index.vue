<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.back()"
        @search="onSearch(searchText)"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-results v-if="isResultShow" :searchText="searchText" />
    <!-- /搜索结果 -->

    <!-- 搜索提示 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @clickSuggestionSearch="onSearch"
    />
    <!-- /搜索提示 -->

    <!-- 历史记录 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @deleteHistories="deleteHistories"
      @deleteAllHistories="deleteAllHistories"
      @clickHistorySearch="onSearch"
    />
    <!-- /历史记录 -->
  </div>
</template>

<script>
// 引入搜索提示组件
import searchSuggestion from './components/search-suggestion.vue'
// 引入搜索历史组件
import searchHistory from './components/search-history.vue'
// 引入搜索结果组件
import searchResults from './components/search-results.vue'
// 引入 本地存储
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'searchIndex',
  data() {
    return {
      searchText: '', // 搜索输入框的内容
      isResultShow: false, // 是否展示搜索结果
      // 本地存储解决 历史记录持久化问题
      searchHistories: getItem('search-histories') || [] // 历史记录数组
    }
  },

  components: {
    searchSuggestion,
    searchHistory,
    searchResults
  },

  methods: {
    // 电脑上 回车 / 手机上面 点击搜索会触发此方法
    onSearch(searchWords) {
      // 用户点击 哪个搜索提示 那么就要按照那个搜索提示的 关键词搜索 即在这里
      // 把 searchText 改成 被点击的搜索提示的关键词
      this.searchText = searchWords

      // 历史记录 每搜索一次就要 更新一次 历史记录数组
      const searchInfoIndex = this.searchHistories.indexOf(searchWords)
      if (searchInfoIndex !== -1) {
        // 历史记录不能有重复的 重复了就把 之前的删掉 相当于是覆盖了
        this.searchHistories.splice(searchInfoIndex, 1)
      }

      // 注意这里分两种情况
      //    1. searchSuggestion是 用户点击搜索提示 然后传过来的
      //    2. searchSuggestion是 用户输入后 直接回车传过来的 (这里还没传) 所以过去传一下值
      this.searchHistories.unshift(searchWords)

      // 数据持久化  因为接口无了  所以只能用本地存储了
      setItem('search-histories', this.searchHistories)

      // 展示搜索结果
      this.isResultShow = true
    },

    // 删除单个历史记录
    deleteHistories(index) {
      this.searchHistories.splice(index, 1)

      // 数据持久化  使用本地存储  因为这里的接口无了
      setItem('search-histories', this.searchHistories)
    },

    // 删除所有历史记录
    deleteAllHistories() {
      this.searchHistories = []

      // 数据持久化
      setItem('search-histories', this.searchHistories)
    }
  }
}
</script>
