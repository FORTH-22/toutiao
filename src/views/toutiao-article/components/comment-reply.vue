<template>
  <div class="comment-reply-container">
    <!-- 上面的导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon name="cross" slot="left" @click="$emit('closeReplyComment')" />
    </van-nav-bar>

    <!-- 当前评论项 -->
    <CommentItem :comment="comment" />

    <!-- 评论列表 -->
    <van-cell title="全部回复"></van-cell>
    <CommentList type="c" :source="comment.com_id" />
  </div>
</template>

<script>
import CommentItem from './comment-Item.vue'
import CommentList from './comment-list.vue'

export default {
  name: 'ReplyComment',

  props: ['comment', 'list'],

  components: {
    CommentItem,
    CommentList
  }
}
</script>
