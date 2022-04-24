<template>
  <div class="home-container">
    <!-- 顶部搜索框 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        to="/search"
        >搜索</van-button
      >

      <!-- 自定义 tabs slots  用来显示 点击就弹出频道编辑页面的按钮 -->
      <div slot="right" class="wap-nav-container">
        <van-icon name="wap-nav" @click="channelsEditShow" />
      </div>
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <van-tabs v-model="active" animated class="channels-container">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>

    <!-- 文章频道编辑 弹出层 popup -->
    <van-popup
      v-model="isChannelsEditShow"
      get-container="body"
      close-icon-position="top-left"
      :style="{ height: '80%' }"
      position="bottom"
      closeable
      round
    >
      <!-- 频道编辑页面 -->
      <channel-edit
        :user-channels="channels"
        :active="active"
        ref="channelEdit"
        @AddUserChannels="AddUserChannels"
        @DeleteUserChannels="DeleteUserChannels"
        @switchUserChannel="switchUserChannel"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
// 引入每个频道 对应的文章内容 的组件
import ArticleList from './components/article-list.vue'
// 引入 频道编辑 组件
import ChannelEdit from './components/channel-edit.vue'
// 引入 mapState 用来简化 vuex容器中的 user 引入它是为了实现 数据持久化的功能
import { mapState } from 'vuex'
// 引入本地存储
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  data() {
    return {
      channels: [],
      isChannelsEditShow: false,
      active: 0
    }
  },

  components: {
    ArticleList,
    ChannelEdit
  },

  computed: {
    // 引入 mapState 用来简化 vuex容器中的 user 引入它是为了实现 数据持久化的功能
    ...mapState(['user'])
  },

  watch: {},

  created() {
    this.loadChannels()
  },

  methods: {
    // 正确获取首页频道数据 考虑用户登陆 和 未登录两种情况
    // 同时 包括数据持久化功能
    async loadChannels() {
      if (this.user) {
        // 用户如果登陆了 那么 一直都是 跟 服务器之间通信
        // 请求获取频道数据
        const { data } = await getUserChannels()
        // console.log(data)
        this.channels = data.data.channels
      } else {
        // 如果没有登陆  那么 一直都是 跟 本地存储通信
        const localChannels = getItem('user-channels')
        // 但是又分为两种情况
        if (localChannels) {
          // 1. 本地存储中有值  那么就 读取本地存储的值
          this.channels = localChannels
        } else {
          // 2. 本地存储中没有  而且又没有登陆 那么就读取 系统推荐的频道
          // 接口仍然是 上面 登陆后读取的那个接口  只不过是 后端会判断 如果登陆了
          // 那么必然会传 token 那么表示登陆了,  那么就返回该用户的频道
          // 如果没登陆 那么不会传 token 即表示 未登录  那么就返回 系统推荐的频道
          // 请求获取频道数据
          const { data } = await getUserChannels()
          // console.log(data)
          this.channels = data.data.channels
        }
      }
    },

    // 展示频道编辑页面
    channelsEditShow() {
      //  让 频道编辑页面 打开时 没有删除频道的 那个 ❌
      if (this.$refs.channelEdit) this.$refs.channelEdit.isEdit = false
      this.isChannelsEditShow = true
    },

    // 这里 通过 父子组件通信的方式 在 父组件中 修改父组件传给 子组件(channel-edit)的 userChannels
    // 添加频道
    AddUserChannels(channel) {
      this.channels.push(channel)

      // 数据持久化
    },

    // 删除频道
    DeleteUserChannels(index) {
      // 这个判断 是为了解决 一个bug  如果删除 当前频道 前面的频道 那么当前频道的 高亮状态 会出问题
      // 因为 active 是不变的  但是 index 已经 -1 了
      if (index <= this.active) {
        this.active -= 1
      }

      this.channels.splice(index, 1)

      // 数据持久化
    },

    // 切换频道
    switchUserChannel(index) {
      this.active = index

      // 切换频道 当然得把 弹出层 给它 关掉
      this.isChannelsEditShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }

  .search-btn {
    width: 270px;
    height: 30px;
    background: #5babfb;
    border: none;

    .van-icon {
      color: white;
    }
  }

  /deep/ .van-tabs__content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow: auto;
  }

  // 频道 van-tabs的调整
  .channels-container {
    /deep/ .van-tabs__line {
      bottom: 20px;
      background: #3296fa;
    }
  }

  // 用来显示 点击就弹出频道编辑页面的按钮
  .app-nav-bar {
    .wap-nav-container {
      .van-icon {
        color: #dddd;
        font-size: 24px;
        height: 47px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
