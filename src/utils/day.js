import Vue from 'vue'

import dayjs from 'dayjs'
// 引入中文语言包
import 'dayjs/locale/zh-cn'
// 引入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置中文语言包
dayjs.locale('zh-cn')

// 配置使用相对时间
dayjs.extend(relativeTime)

// 测试
// console.log(dayjs('2022-04-21 19:11').from(dayjs()))

// 创建过滤器
Vue.filter('relativeTime', (currentTime) => {
  return dayjs(currentTime).from(dayjs())
})
