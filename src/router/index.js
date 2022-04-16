import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login/')
  },

  {
    // 父组件
    path: '/',
    // 父组件一般没必要 设置 name
    component: () => import('@/views/layout/'),

    // 子组件
    children: [
      {
        path: '/home',
        name: 'home', // 子组件一般会设置 name
        component: () => import('@/views/home/')
      },

      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },

      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },

      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
