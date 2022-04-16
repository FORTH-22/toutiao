import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.less'

// 引入 Vant 组件库
import Vant from 'vant'

// 引入 Vant 样式
import 'vant/lib/index.css'

// 引入 amfe-flexible  自动设置REM基准值 (html标签字体大小)
import 'amfe-flexible'

// 全局注册 Vant 组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
