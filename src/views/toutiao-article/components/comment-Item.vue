<template>
  <van-cell class="commentItem-container" center>
    <!-- 评论者 头像 -->
    <van-image
      slot="icon"
      round
      :src="comment.aut_photo"
      class="comment-avatar"
    />
    <!-- 评论者 ID 以及 评论内容 -->
    <div slot="title" class="comment-info">
      <div class="top-info">
        <!-- 作者ID -->
        <div class="comment-name">{{ comment.aut_name }}</div>
        <!-- 右边的点赞图标 -->
        <div class="like-count" @click="onCommentLike">
          <van-icon
            slot="default"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            :color="comment.is_liking ? 'hotpink' : ''"
          />
          <span>{{ comment.like_count }}</span>
        </div>
      </div>
      <div>{{ comment.content }}</div>
    </div>

    <!-- 发布时间 以及 回复按钮 并排 -->
    <div class="label-container" slot="label">
      <div class="comment-pubdate">{{ comment.pubdate | dateTime }}</div>
      <van-button
        class="reply-btn"
        type="default"
        size="mini"
        round
        @click="$emit('replyComment', comment)"
        >{{ comment.reply_count }}&nbsp;回复</van-button
      >
    </div>
  </van-cell>
</template>

<script>
// 引入 点赞评论 或者评论回复的 接口
import { addCommentLike, cancelCommentLike } from '@/api/comment'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  methods: {
    // 点赞评论功能
    async onCommentLike() {
      // 轻提示
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })

      if (this.comment.is_liking) {
        // 如果用户点赞过该评论了  那么取消点赞
        await cancelCommentLike(this.comment.com_id)

        // 提示
        this.$toast.success({
          message: '取消点赞成功',
          forbidClick: true
        })

        // 更新点赞数
        // this.comment.like_count-- // 子组件不能直接修改父组件的值
        this.$emit('difCommentLikeNum')
      } else {
        // 反之 点赞
        await addCommentLike(this.comment.com_id)

        // 提示
        this.$toast.success({
          message: '点赞成功',
          forbidClick: true
        })

        // 更新点赞数
        // this.comment.like_count++   子组件不能直接修改父组件的值
        this.$emit('addCommentLikeNum')
      }

      // 更新 点赞的状态 is_liking
      // this.comment.is_liking = !this.comment.is_liking   子组件不能直接修改父组件的值
      this.$emit('updateCommentIsLiking')
    }
  }
}
</script>

<style lang="less" scoped>
.commentItem-container {
  // 头像
  .comment-avatar {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }

  // 作者ID 评论内容 点赞图标和 点赞数
  .comment-info {
    .top-info {
      display: flex;
      justify-content: space-between;
      .comment-name {
        color: #406599;
      }
    }
  }

  // 下面的  发布日期 回复按钮
  .label-container {
    display: flex;
    align-items: center;
    .comment-pubdate {
      font-size: 10px;
      color: rgba(169, 165, 165, 0.867);
      margin-right: 12px;
    }

    .reply-btn {
      background: #dddd;
      padding: 0 10px;
      color: rgb(139, 136, 136);
    }
  }
}
</style>
