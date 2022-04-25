import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/toutiao-login')
  },

  // 首页下面的 四个导航栏
  {
    // 父路由
    path: '/', // 默认路由
    component: () => import('@/views/father'),
    // 要想让父路由激活的同时 第一个子路由也激活 需要设置一个重定向 路径指向第一个子路由
    redirect: '/home',

    // 子路由
    children: [
      {
        path: '/home', // 默认子路由
        name: 'home', // 子组件一般会设置 name
        component: () => import('@/views/toutiao-home')
      },

      {
        path: '/question',
        name: 'question',
        component: () => import('@/views/toutiao-questions')
      },

      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/toutiao-video')
      },

      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/toutiao-my')
      }
    ]
  },

  // 搜索页面
  {
    path: '/search',
    component: () => import('@/views/toutiao-search')
  },

  // 文章详情页面
  {
    path: '/article/:articleId', // 动态路由
    name: 'article',
    component: () => import('@/views/toutiao-article')
  }
]

const router = new VueRouter({
  routes
})

export default router
