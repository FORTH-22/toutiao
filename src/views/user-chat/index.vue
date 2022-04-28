<template>
  <div class="user-chat">
    <!-- 上面的导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 中间的 聊天界面 -->
    <van-cell-group class="talking-container" ref="message-list">
      <van-cell
        v-for="(talking, index) in talkingRecord"
        :key="index"
        :title="talking.msg"
      />
    </van-cell-group>

    <!-- 底部输入框 和 发送按钮 -->
    <van-field
      v-model="message"
      center
      clearable
      placeholder="说出你的想法吧"
      class="send-container"
    >
      <template #button>
        <van-button size="small" type="info" @click="onSendMessage"
          >发送</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
// 引入 相当于 http 和 axios 关系  Websocket 的 socket.io
import { io } from 'socket.io-client'

// 引入 mapState
import { mapState } from 'vuex'

// 引入 本地存储 用来数据持久化
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  data() {
    return {
      message: '',
      socket: null,
      talkingRecord: getItem('message-list') || []
    }
  },

  computed: {
    ...mapState(['user'])
  },

  mounted() {
    this.scrollToBottom()
  },

  // 数据持久化
  watch: {
    talkingRecord() {
      setItem('message-list', this.talkingRecord)

      // 每次 talkingRecord一更新 即发送新消息或者收到新消息 那么就滑到聊天界面的 最新消息
      // 因为 每次都是 更新好了DOM 我们才能 滑到最新的聊天记录 所以要用到 $nextTick
      this.$nextTick(this.scrollToBottom)
    }
  },

  created() {
    // 创建 socket 实例
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: this.user.token
      },
      transports: ['websocket']
    })

    this.socket = socket

    // 接收发送来的消息
    socket.on('message', (data) => {
      // 将对方 发来的消息 也加入 talkingRecord
      this.talkingRecord.push(data)
    })
  },

  methods: {
    onSendMessage() {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      // 请求发送消息
      this.socket.emit('message', data)

      // 输入框清空
      this.message = ''

      // 将聊天记录添加到 talkingRecord
      this.talkingRecord.push(data)
    },

    // 聊天记录 更新到最新消息
    scrollToBottom() {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  }
}
</script>

<style lang="less" scoped>
.user-chat {
  .talking-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 53px;
    overflow: auto;
  }

  .send-container {
    position: fixed;
    bottom: 0;
  }
}
</style>
