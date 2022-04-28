<template>
  <div class="comment-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(comment, index) in list" :key="index" :title="comment.content" /> -->
      <CommentItem
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @addCommentLikeNum="comment.like_count++"
        @difCommentLikeNum="comment.like_count--"
        @updateCommentIsLiking="comment.is_liking = !comment.is_liking"
        @replyComment="$emit('replyComment', $event)"
      />
    </van-list>
  </div>
</template>

<script>
// 引入 获取文章评论数据的 请求方法
import { getArticleComments } from '@/api/comment'
// 引入评论项组件
import CommentItem from './comment-Item.vue'

export default {
  name: 'CommentList',
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },

  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },

    source: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: 'a'
    }
  },

  components: {
    CommentItem
  },

  methods: {
    async onLoad() {
      // 1. 封装接口 获取 文章评论数据
      const { data } = await getArticleComments({
        type: this.type.toString(),
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })

      // console.log(data)
      // 2. 把数据 放到列表中
      const { results } = data.data
      // this.list.push(...results) // 子组件不能直接修改父组件的值
      this.$emit('pushCommentList', results)

      // console.log(this.list)

      // 把总评论数 传给父组件 让它展示 这篇文章的总评论数
      this.$emit('updateTotalComments', data.data.total_count)

      // 3. 关闭本次loading
      this.loading = false

      // 4. 判断是否还有数据
      if (results.length) {
        // 还有数据 那么就 更新页码
        this.offset = data.data.last_id
      } else {
        // 没有数据 就把 finished 置为 true
        this.finished = true
      }
    }
  }
}
</script>

<style></style>
