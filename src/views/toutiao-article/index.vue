<template>
  <div class="article-container">
    <!-- 上面的导航条 -->
    <!-- 这个用的很多 所以样式写在了全局样式文件 src/styles/index.less 里面 你可能忘记了 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息 -->
    <div class="articleInfo-container">
      <!-- 文章标题 -->
      <h1 class="article-name">{{ articleInfo.title }}</h1>

      <!-- 作者信息 以及右边的关注按钮 -->
      <van-cell center>
        <div slot="title">{{ articleInfo.aut_name }}</div>
        <div slot="label">{{ articleInfo.pubdate | relativeTime }}</div>
        <!-- 作者头像 -->
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          :src="articleInfo.aut_photo"
          style="margin-right: 10px"
        />

        <!-- 右边的关注按钮 -->
        <van-button
          :type="articleInfo.is_followed ? 'default' : 'info'"
          :icon="articleInfo.is_followed ? '' : 'plus'"
          :loading="isLoadingShow"
          size="small"
          round
          @click="onFollow"
          >{{ articleInfo.is_followed ? '已关注' : '关注' }}</van-button
        >
      </van-cell>

      <!-- 文章内容 -->
      <p class="markdown-body" v-html="articleInfo.content"></p>
    </div>

    <!-- 底部区域 -->
    <div class="articleInfo-bottom-container">
      <van-button type="default" round>写评论</van-button>

      <!-- 图标 收藏 点赞 分享 -->
      <div class="stat-good-share">
        <van-icon name="comment-o" color="#dddd" />
        <van-icon
          :name="articleInfo.attitude === 1 ? 'good-job' : 'good-job-o'"
          :color="articleInfo.attitude === 1 ? 'hotpink' : '#dddd'"
          @click="onLike"
        />
        <van-icon
          :name="articleInfo.is_collected ? 'star' : 'star-o'"
          :color="articleInfo.is_collected ? 'orange' : '#dddd'"
          @click="onCollect"
        />
        <van-icon name="share-o" color="#dddd" />
      </div>
    </div>
  </div>
</template>

<script>
// 引入 github 中的 一种 正文风格 的 css库
import './github-markdown.css'

// 引入请求正文的 请求方法
// 引入 用户收藏 和 用户取消收藏的接口
import { getArticlesContents } from '@/api/article'

// 加载 处理相对时间的文件
import '@/utils/day'

// 引入 用户关注 和 用户取消关注的接口
import {
  // 关注
  addUserFollow,
  cancelUserFollow,
  // 收藏
  addUserCollect,
  cancelUserCollect,
  // 点赞
  addUserLike,
  cancelUserLike
} from '@/api/user'

export default {
  name: 'ArticleIndex',
  data() {
    return {
      articleInfo: {},
      isLoadingShow: false
    }
  },

  created() {
    this.loadArticleContents()
  },
  methods: {
    async loadArticleContents() {
      const { data } = await getArticlesContents(this.$route.params.articleId)
      //   console.log(data)
      this.articleInfo = data.data
    },

    // 关注功能
    async onFollow() {
      // 防止用户点击一次后 又多次点击 所以请求过程中使用 button的 Loading 来禁用按钮
      this.isLoadingShow = true
      if (this.articleInfo.is_followed) {
        // 已关注  那么点击就是取消关注
        await cancelUserFollow(this.articleInfo.aut_id)

        // 关注了之后就要更新一下数据
        // this.articleInfo.is_followed = false
      } else {
        // 未关注  那么点击就是关注它
        await addUserFollow(this.articleInfo.aut_id)

        // 关注了之后就要更新一下数据
        // this.articleInfo.is_followed = true
      }

      // 或者可以在这里统一更新
      this.articleInfo.is_followed = !this.articleInfo.is_followed

      // 处理过后 去除loading
      this.isLoadingShow = false
    },

    // 收藏功能
    async onCollect() {
      // 防止用户点击一次后 又多次点击 不过这次不用 button 的 loading  而是用vant 的轻提示 toast
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      if (this.articleInfo.is_collected) {
        // 已收藏  那么点击就是取消收藏
        await cancelUserCollect(this.articleInfo.art_id)
        // 取消收藏成功 那就提示
        this.$toast.success('取消收藏成功')
      } else {
        // 未收藏  那么点击就是收藏它
        await addUserCollect(this.articleInfo.art_id)
        // 收藏成功 那就提示
        this.$toast.success('收藏成功')
      }

      // 可以在这里统一更新
      this.articleInfo.is_collected = !this.articleInfo.is_collected
    },

    // 点赞功能
    async onLike() {
      // 防止用户点击一次后 又多次点击 不过这次不用 button 的 loading  而是用vant 的轻提示 toast
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      if (this.articleInfo.attitude === 1) {
        // 已点赞  那么点击就是取消点赞
        await cancelUserLike(this.articleInfo.art_id)
        // 取消点赞成功 那就提示
        this.$toast.success('取消点赞成功')
      } else {
        // 未点赞  那么点击就是点赞它
        await addUserLike(this.articleInfo.art_id)
        // 点赞成功 那就提示
        this.$toast.success('点赞成功')
      }

      // 可以在这里统一更新
      this.articleInfo.attitude = this.articleInfo.attitude === -1 ? 1 : -1
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .articleInfo-container {
    // 这是在让文章信息 固定 相当于把上面的导航栏固定
    position: fixed;
    left: 0;
    right: 0;
    overflow: auto;
    top: 47px;
    bottom: 44px;
    .article-name {
      font-size: 20px;
      background-color: #fff;
      margin: 0;
      padding: 10px;
    }
  }

  .articleInfo-bottom-container {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    display: flex;
    .van-button {
      flex: 1;
      margin-right: 20px;
    }

    .stat-good-share {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
