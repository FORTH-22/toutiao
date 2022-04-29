<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isPullDownLoading"
      @refresh="onRefresh"
      :success-text="pullDownSuccessText"
      :success-duration="800"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
        /> -->

        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 引入 getArticles 请求文章数据
import { getArticles } from '@/api/article'

// 引入封装好的 文章列表项
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isPullDownLoading: false, // 下拉刷新的状态
      pullDownSuccessText: '' // 刷新成功后的提示 可以直接写 也可以自定义
    }
  },

  components: {
    ArticleItem
  },

  methods: {
    async onLoad() {
      // 1. 请求获取数据
      const { data } = await getArticles({
        // 频道ID
        channel_id: this.channel.id,
        // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        // 现在就不能写死了 首先刚进入的时候 置为 Date.now() 之后置为data中的timestamp 它维护的是下一页对应的时间戳
        timestamp: this.timestamp || Date.now()
      })

      const results = data.data.results
      // console.log(results)
      // console.log(data)
      // 2. 把文章放到 articles数组中
      this.articles.push(...results)

      // 3. 设置本次加载状态结束  继续下一次加载
      this.loading = false

      // 4. 处理数据全部加载完成 / 加载下一页数据 两种情况  因为目前 时间戳timestamp是写死的 没有进入下一页
      if (results.length) {
        // 更新时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 如果数据加载完了
        this.finished = true
      }
    },

    async onRefresh() {
      // 1. 请求获取数据
      const { data } = await getArticles({
        // 频道ID
        channel_id: this.channel.id,
        // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        // 目前是显示 最新数据 所以传当前时间戳即可 这里是后端规定的 只要传的时间戳不同 那么数据就不同 实际开发可能不是这样
        timestamp: Date.now()
      })

      const results = data.data.results
      // console.log(results)
      // 2. 把下拉刷新得到的 数据 添加到 文章列表中
      this.articles.unshift(...results)

      // 3. 关闭下拉刷新状态
      this.isPullDownLoading = false

      // 设置下拉刷新成功的 提示
      this.pullDownSuccessText = `更新了${results.length} 篇文章 快去看看吧!`
    }
  }
}
</script>
