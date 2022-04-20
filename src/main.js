import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 Vant 组件库
import Vant from 'vant'

// 引入 Vant 样式
import 'vant/lib/index.css'

// 引入 amfe-flexible  自动设置REM基准值 (html标签字体大小)
import 'amfe-flexible'

// 加载全局样式
import './styles/index.less'
// 自己写的全局样式放到后面,就可以层叠/覆盖掉 vant自带的样式 就可以
// 避免过多的在 index.less中 使用 !important
// 其实不光是 vant 只要有第三方库 那么自己写的样式 最好放到 后面

// 全局注册 Vant 组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
