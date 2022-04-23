<template>
  <div class="father-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 底部导航栏  相当于是 router-link -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">{{
        this.user ? '我的' : '未登录'
      }}</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FatherIndex',
  data() {
    return {
      active: 0
    }
  },

  computed: {
    ...mapState(['user'])
  }
}
</script>

<style></style>
