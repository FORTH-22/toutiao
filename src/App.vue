<template>
  <div id="app">
    <!-- 这里是所有 一级路由的出口 所以组件缓存 应该加到这里 -->
    <!--  我只想要 layout 被缓存 其他的 如果被缓存 甚至会影响正常功能 -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// 引入 mapState 为了 拿到缓存页面数组
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less"></style>
