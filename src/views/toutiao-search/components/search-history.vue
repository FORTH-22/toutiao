<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <!-- cell默认插槽 可以不写slot 对应的是单元格右边的内容 -->
      <div slot="default" v-if="isDeleteShow">
        <span @click="deleteAllHistories">全部删除</span> &nbsp;
        <span @click="isDeleteShow = !isDeleteShow">完成</span>
      </div>
      <!-- 垃圾箱图标 -->
      <van-icon name="delete-o" v-else @click="isDeleteShow = !isDeleteShow" />
    </van-cell>

    <!-- 搜索的内容 -->
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="deleteUserHistories(index, history)"
    >
      <!-- 默认插槽 图标放在单元格右边 -->
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  data() {
    return {
      isDeleteShow: false // 删除的显示状态
    }
  },

  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },

  methods: {
    // 删除单个历史记录
    deleteUserHistories(index, history) {
      if (this.isDeleteShow) {
        // 只有是在删除的状态下  用户点击才会删除历史记录
        this.$emit('deleteHistories', index)
      } else {
        // 否则 是 按照该历史纪录的关键词 来搜索
        // 需要把 关键词传过去
        this.$emit('clickHistorySearch', history)
      }
    },

    // 删除所有历史记录
    deleteAllHistories() {
      this.$emit('deleteAllHistories')
    }
  }
}
</script>
