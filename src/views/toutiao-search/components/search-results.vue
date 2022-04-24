<template>
  <div class="search-results">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
// 引入 获取搜索结果的 请求方法
import { getSearchResults } from '@/api/search'

export default {
  name: 'searchResults',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },

  props: {
    searchText: {
      type: String,
      required: true
    }
  },

  methods: {
    async onLoad() {
      // 1. 找接口 封装请求方法
      // 2. 请求获取数据
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })

      // 3. 数据添加到 list数组中
      const { results } = data.data
      console.log(results)
      this.list.push(...results)

      // 4. 关闭本次的 loading
      this.loading = false

      // 5. 判断是否还有数据
      //      如果有  那么更新页码到下一页
      //      反之 就把 finished 设置为 true 关闭加载
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-results {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 54px;
  overflow: auto;
}
</style>
