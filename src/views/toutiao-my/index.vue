<template>
  <div class="my-container">
    <!-- 用户信息 -->
    <van-cell-group v-if="user" class="my-info">
      <!-- 用户基本信息 -->
      <van-cell
        class="base-info"
        :border="false"
        center
      >
        <van-image
          slot="icon"
          fit="cover"
          class="avatar"
          round
          :src="currentUser.photo"
        />
        <div slot="title" class="user-name">{{currentUser.name}}</div>
        <van-button size="small" class="update-info" round>
          编辑资料
        </van-button>
      </van-cell>
      <!-- 用户平台相关数据 -->
      <van-grid :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text">{{currentUser.art_count}}</div>
          <div slot="text">头条</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text">{{currentUser.follow_count}}</div>
          <div slot="text">关注</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text">{{currentUser.fans_count}}</div>
          <div slot="text">粉丝</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text">{{currentUser.like_count}}</div>
          <div slot="text">获赞</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 未登录时展示的页面 -->
    <div v-else class="not-login-info" @click="$router.push('/login')">
      <div>
        <img src="./images/unlogin-img.png" alt="" />
      </div>
      <div class="text">登陆/注册</div>
    </div>

    <!-- 查看收藏 与 查看历史功能 -->
    <!-- 要注意的一点就是 这个部分和上面用户信息是分开的 因为 用户信息那里有一个统一的蓝色背景 -->
    <!-- 可以使用 vant2提供的 icon  也可以自己引入 阿里iconfonts中的图标 -->
    <van-grid
      :column-num="2"
      :border="false"
      class="nav-star-history-grid mb-8"
    >
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="browsing-history-o" text="历史" />
    </van-grid>

    <!-- 小智同学 和 消息通知 单元格 具有导航功能 不过 跳转页面目前 还没写出来 所以暂时先写成首页 -->
    <van-cell title="小智同学" is-link to="/" />
    <van-cell title="消息通知" is-link to="/" :border="false" class="mb-8" />

    <!-- 退出登陆按钮 -->
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登陆"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      // 不能用 user 因为下面 mapstate 映射已经用到了 user
      currentUser: {}
    }
  },
  computed: {
    // 映射 vuex容器中的 user数据
    ...mapState(['user'])
  },
  watch: {},
  // 创建后就把 当前登陆用户信息加载进来
  created() {
    this.loadCurrentUser()
  },
  mounted() {},
  methods: {
    onLogout() {
      // 引入 Dialog 组件后，会自动在 Vue 的 prototype 上挂载 $dialog 方法，在所有组件内部都可以直接调用此方法。
      // 这样就不需要再 引入组件了
      this.$dialog
        .confirm({
          message: '确认退出吗?'
        })
        .then(() => {
          // 确认退出
          // 确认退出 那就改变 用户登陆状态 即把 vuex 中的user 置为null / 空字符串
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },

    async loadCurrentUser() {
      // 结构赋值 直接把axios 请求获取结果中的 data对象 解构出来了
      const { data } = await getCurrentUser()
      console.log(data)
      // 因为在当前组件 需要用到用户数据 所以在 data() 中存 currentUser的数据 方便 html 中使用
      this.currentUser = data.data
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  // 这里原本是想要在这里设置一下浅灰色的背景底色 后来发现这个是需要在 全局样式index.less文件中设置的

  // 用户信息样式调整
  .my-info {
    background: url('./images/banner.png');
    background-size: cover;

    // 用户基本信息样式调整
    .base-info {
      background-color: unset;
      box-sizing: border-box;
      height: 115px;
      // 上 -> 右 -> 下 -> 左
      padding: 38px 20px 10px 20px;

      // 头像
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        margin-right: 10px;
      }

      // 昵称
      .user-name {
        font-size: 16px;
        color: #fff;
      }

      // 编辑资料
      .update-info {
        color: rgb(175, 172, 172);
      }
    }

    // 用户数据资料样式调整
    .data-info-item {
      color: #fff;
      font-size: 13px;
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  // 未登录时所展示的
  .not-login-info {
    height: 180px;
    background: url('./images/banner.png') no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 66px;
      height: 66px;
    }

    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  // 收藏和历史 样式调整
  /deep/ .nav-star-history-grid {
    .van-grid-item {
      height: 80px;

      // 收藏
      .van-icon-star-o {
        font-size: 20px;
        color: #eb5253;
      }

      // 历史
      .van-icon-browsing-history-o {
        font-size: 20px;
        color: rgb(182, 136, 136);
      }
    }
  }

  // 退出登陆
  .logout-cell {
    text-align: center;
    color: #db8623;
  }

  // 通用样式 下边距4px
  .mb-8 {
    margin-bottom: 8px;
  }
}
</style>
