<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false" class="my-channels">
      <div slot="title">我的频道</div>
      <van-button
        type="info"
        size="mini"
        slot="default"
        round
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-channels">
      <van-grid-item
        v-for="(channel, index) in userChannels"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        :key="index"
        :text="channel.name"
        @click="onUserChannelsClick(channel, index)"
      />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell center :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
// 引入请求 所有频道列表的 封装后的请求方法
// 引入 添加用户频道 将数据上传至服务器 封装后的请求方法
// 引入 删除用户频道 将数据上传至服务器  封装后的请求方法
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
// 引入 容器中 的 user  使用mapState 简化写法
import { mapState } from 'vuex'
// 引入 封装好的 本地存储 localStorage
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: [], // 所有频道的数据
      isEdit: false // 编辑状态
    }
  },

  props: {
    userChannels: {
      // 用户频道 数组
      type: Array,
      required: true
    },

    active: {
      // 当前 处于 tabs 中的 哪个tab 的标志
      type: Number,
      required: true
    }
  },

  created() {
    this.loadAllChannels()
  },

  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels()
      // console.log(data)
      this.allChannels = data.data.channels
    },

    // 添加频道
    async addChannel(channel) {
      // 子组件不能 直接修改父组件穿过来的值 在这里就是 不能修改 userChannels
      // 所以这里 通过 父子组件通信的方式 在 父组件中 修改父组件传给 子组件的 userChannels
      this.$emit('AddUserChannels', channel)

      // 之后还有数据持久化的内容
      if (this.user) {
        // 用户登陆了 数据存储在服务器
        // console.log('用户登陆了')
        await addUserChannel({
          channels: [
            {
              id: channel.id,
              // 这里的 seq 指的是当前添加频道的序号 是从1 开始的
              // 至于为什么不是 length + 1 是因为 上面已经 把当前频道添加到userChannels中了 相当于已经 + 1
              seq: this.userChannels.length
            }
          ]
        })
      } else {
        // 用户没登陆 那么数据 存储在本地
        // 使用 本地存储 localStorage
        setItem('user-channels', this.userChannels)
      }
    },

    // 删除频道 / 切换频道
    onUserChannelsClick(channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态  那么点击就删除频道
        // console.log('删除频道')
        this.deleteChannel(channel, index)
      } else {
        // 不是编辑状态 那么点击 就切换到对应频道去
        // console.log('切换频道')
        this.switchChannel(index)
      }
    },

    // 封装好的 删除频道函数
    async deleteChannel(channel, index) {
      this.$emit('DeleteUserChannels', index)

      // 之后还有数据持久化的内容
      if (this.user) {
        // 如果登陆了 那么就把 数据上传至 服务器
        await deleteUserChannel(channel.id)
      } else {
        // 如果没登陆  那么就把数据 保存在本地
        setItem('user-channels', this.userChannels)
      }
    },

    // 封装好的 切换频道的函数
    switchChannel(index) {
      this.$emit('switchUserChannel', index)

      // 之后还有数据持久化的内容
    }
  },

  computed: {
    // 计算 推荐频道的思路  所有频道 - 用户频道已有的频道 = 推荐的频道
    // 其实 这里还与后面 添加频道的功能相关联 试想 如果添加频道 到 用户频道中
    // 那么这里的计算属性 肯定会 将该添加的频道 从频道推荐中 过滤出去 省去了 删除频道的 代码 还是很巧妙的
    recommendChannels() {
      // filter查找所有满足条件的所有元素 即找出 在所有推荐频道 但是不在用户频道的 所有频道
      return this.allChannels.filter((channel) => {
        // find 查找满足条件的 单个元素 即 判断 当前遍历到的频道 是否在用户频道中
        return !this.userChannels.find((userChannel) => {
          return channel.id === userChannel.id
        })
      })
    },

    // 引入 vuex 中的 user
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 40px 10px;

  .my-channels {
    .van-button {
      padding: 0 12px;
    }

    .active {
      /deep/ .van-grid-item__content {
        background: #3296fa;
      }
    }

    /deep/ .van-grid-item__content {
      background: #f4f5f6;
      position: relative;
      .van-icon {
        position: absolute;
        right: -14px;
        top: -14px;
        color: rgb(157, 154, 154);
        font-size: 18px;
      }

      // 解决 点击编辑按钮 item出现删除图标后 文字下沉问题
      // 原因是 vant 在这里设置了 margin-top 去除即可
      .van-grid-item__text {
        margin-top: unset;
        color: rgba(109, 105, 105, 0.867);
      }
    }
  }
}
</style>
