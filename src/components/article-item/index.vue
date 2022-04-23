<template>
  <!-- <div class="article-item">文章列表项</div> -->
  <van-cell class="article-item">
    <!-- 自定义插槽 -->
    <!-- 标题 -->
    <!-- 当文章标题的字太多时候 需要省略 所以 使用vant内置样式 让它最多显示两行 -->
    <div slot="title" class="article-item-title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>

    <!-- 第二种情况 有三张图片 在下面 相当于实在 label 中 所以和文章信息 例如作者 发布日期等 放在同一个 label中 -->
    <div slot="label">
      <!-- 显示三张图片 -->
      <div class="article-item-image-container" v-if="article.cover.type === 3">
        <div
          class="article-item-image-info"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image fit="cover" :src="img" class="article-item-image" />
        </div>
      </div>

      <!-- 下面的文章信息 例如 作者 发布日期 -->
      <!-- 因为是上下关系 所以需要换行 所以用div包一下 -->
      <div class="article-author-info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <!-- 使用过滤器处理相对时间 -->
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>

    <!-- 第一种情况 只有一张图片 在右边 -->
    <!-- 右边的插槽是默认插槽 名字是default 可以省略 -->
    <div slot="default" v-if="article.cover.type === 1">
      <van-image
        width="116"
        height="73"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </div>
  </van-cell>
</template>

<script>
// 加载相对时间 day.js 在 utils中
import '@/utils/day'

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .article-item-title {
    font-size: 14px;
    color: rgba(58, 56, 56, 0.867);
  }

  // 图片固定大小  标题分配剩余空间
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 25px;
  }
  // 三张图片的样式
  .article-item-image-container {
    display: flex;
    padding: 10px 0;

    .article-item-image-info {
      flex: 1;

      // 选择器技巧
      &:not(:last-child) {
        margin-right: 8px;
      }

      .article-item-image {
        width: 100%;
        height: 73px;
      }
    }
  }

  // 下面信息的调整
  .article-author-info {
    font-size: 10px;
    span {
      margin-right: 10px;
    }
  }
}
</style>
