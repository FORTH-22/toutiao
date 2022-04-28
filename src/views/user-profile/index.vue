<template>
  <div class="user-profile">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="编辑资料"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 下面四个单元格 对应 头像 昵称 性别 生日 -->
    <van-cell title="头像" center>
      <van-image
        slot="default"
        width="30"
        height="30"
        fit="cover"
        round
        :src="userProfile.photo"
      />
    </van-cell>
    <!-- 用户昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="userProfile.name"
      @click="isNameShow = true"
    />
    <!-- 用户性别 -->
    <van-cell
      title="性别"
      is-link
      :value="userProfile.gender === 1 ? '女' : '男'"
      @click="isGenderShow = true"
    />

    <!-- 用户生日 -->
    <van-cell
      title="生日"
      is-link
      :value="userProfile.birthday"
      @click="isBirthdayShow = true"
    />

    <!-- 昵称的弹出层 -->
    <van-popup
      v-model="isNameShow"
      position="bottom"
      class="edit-name-pop"
      :style="{ height: '40%' }"
    >
      <van-nav-bar
        title="修改昵称"
        left-text="返回"
        right-text="完成"
        left-arrow
        @click-left="isNameShow = false"
        @click-right="onfinishEditName"
      />
      <!-- 修改昵称的输入框 -->
      <van-field
        v-model="userId"
        class="edit-name-field"
        autosizeq
        type="textarea"
        maxlength="14"
        placeholder="请输入新的昵称"
        show-word-limit
      />
    </van-popup>

    <!-- 性别的弹出层 -->
    <van-popup
      v-model="isGenderShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <update-gender
        v-model="userProfile.gender"
        @close="isGenderShow = false"
      />
    </van-popup>

    <!-- 生日的弹出层 -->
    <van-popup
      v-model="isBirthdayShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <update-birthday
        v-model="userProfile.birthday"
        @close="isBirthdayShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
// 引入 获取用户个人资料的 请求方法
// 引入 更新用户个人资料的 请求方法
import { getUserProfile, updateUserProfile } from '@/api/user'

// 引入更新用户性别组件
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'

export default {
  name: 'UserProfile',

  data() {
    return {
      userProfile: {},
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      userId: ''
    }
  },

  components: {
    UpdateGender,
    UpdateBirthday
  },

  created() {
    this.loadUserInfo()
  },

  methods: {
    async loadUserInfo() {
      const { data } = await getUserProfile()
      //   console.log(data)
      this.userProfile = data.data

      this.userId = this.userProfile.name
    },

    // 编辑昵称完成 请求后端更新昵称
    // 目前好像没有 重名校验了 实际上 这里重名之后需要 用 try catch 来捕捉错误 提示用户 重名了
    async onfinishEditName() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      // 请求后端更新用户昵称
      await updateUserProfile({
        name: this.userId
      })

      // 更新前端的数据
      this.userProfile.name = this.userId

      this.$toast.success({
        message: '修改成功',
        forbidClick: true
      })

      // 关闭弹出层
      this.isNameShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .edit-name-pop {
    background: #f5f7f9;
    .edit-name-field {
      margin-top: 10px;
    }
  }
}
</style>
