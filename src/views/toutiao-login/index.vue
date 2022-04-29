<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登陆"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 登陆表单 -->
    <!-- 基于vant 的表单验证
      1. 使用van-form 包裹所有的表单项 van-field
      2. 给 van-form 绑定 @submit 时间
      注：只有表单验证通过时 才会触发 所绑定的事件
      所以就不用在 登陆按钮上绑定 点击事件了
    -->
    <van-form
      @submit="onLogin"
      @failed="onFailed"
      :show-error="false"
      :show-error-message="false"
      :validate-first="true"
      ref="login-form"
    >
      <!-- 手机号表单项 -->
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.phoneNum"
      />

      <!-- 验证码 表单项 -->
      <van-field
        v-model="user.code"
        center
        clearable
        placeholder="请输入短信验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="1000 * 5"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <!-- 发送验证码按钮 -->
          <van-button
            v-else
            size="small"
            type="primary"
            round
            @click.prevent="onSendSms"
            :loading="isSendSmsLoading"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>

      <!-- 登陆按钮 -->
      <div class="login-btn-wrap">
        <van-button type="info" block round>登录</van-button>
      </div>
      <!-- /登陆表单 -->
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// 加载 vant 的 toast
// !!!! 虽然 最开始全部引入了 vant 但这个还是需要单独引入
// 如果不想要单独引入 参考文档的第二种方法 this.$toast 最后复习再学
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },

      // 建议验证规则 放在 data中 不要放在 html结构中
      formRules: {
        phoneNum: [
          { required: true, message: '手机号不能为空' },
          // 正则表达式 (还没学)
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],

        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },

      // 控制 发送按钮 与 倒计时的显示状态
      isCountDownShow: false,

      // 控制 发送短信 按钮的 loading 状态
      isSendSmsLoading: false
    }
  },

  methods: {
    async onLogin() {
      /**
       * 登陆状态提示
       */
      Toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁止登陆中点击页面其他按钮
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })

      // 1.找到数据接口
      // 2.封装请求方法 user.js
      // 3.请求调用登陆 用 promise / async(还没学) 均可
      // 4.处理响应结果
      try {
        const res = await login(this.user)
        Toast.success('登陆成功')

        // 登陆成功后 就把用户状态 改成 后端接口 返回的用户 token
        this.$store.commit('setUser', res.data.data)

        // 登陆成功后 把对于 fatherIndex 的缓存清掉 为了处理 缓存页面带来的影响
        this.$store.commit('removeCachePages', 'FatherIndex')

        // 登陆成功后 就把页面 跳转到 我的页面
        // 鹏周说这样不好 但会有更高的解决方法 之后会讲
        this.$router.back()
      } catch (err) {
        Toast.fail('登陆失败')
        console.log(err)
      }
    },

    onFailed(err) {
      if (err.errors[0]) {
        // this.$toast(err.errors[0].message)
        // 如果要配置 toast 的位置 那么就要 传对象
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },

    async onSendSms() {
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')

        // 验证通过 用户点击后 先显示loading 防止因为用户网络慢 导致多次点击
        // 那么什么时候 关闭loading 呢？
        this.isSendSmsLoading = true
        // 验证手机号通过 下一步发送验证码  这个是在 验证通过的 前提下 再进行 所以是异步(项目完了复习JS要学)  需要用 await 或者用 then
        await sendSms(this.user.mobile)

        // 发送成功后 显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        // 验证失败  就提示
        this.$toast({
          message: err.message,
          position: 'top'
        })
      }

      // 无论成功还是失败 都要把 loading 给关了
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 10px;
  }
}
</style>
