<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @click="$emit('clickSuggestionSearch', suggestion)"
    >
      <div slot="title" v-html="highlight(suggestion)"></div>
    </van-cell>
  </div>
</template>

<script>
// 引入 用来获取搜索提示的 请求方法
import { getSearchSuggestions } from '@/api/search'
// 引入 第三方库 用来处理函数防抖
import { debounce } from 'lodash'

export default {
  name: 'searchSuggestion',
  data() {
    return {
      suggestions: []
    }
  },

  props: {
    searchText: {
      type: String,
      required: true
    }
  },

  methods: {
    // 在搜索提示中 突出显示用户输入的内容
    highlight(suggestion) {
      return suggestion.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color: red">${this.searchText}</span>`
      )
    }
  },

  // 数据监听
  watch: {
    // 因为这里的简写形式 无法监听到 searchText的第一次改变
    // 所以需要用到 完整写法的 immediate属性
    // searchText() {
    //   console.log('hello')
    // }
    // 为什么无法监听到呢 因为 未输入时 搜索提示甚至还没有被渲染出来 只有当输入第一个字母时 才被渲染
    // 所以自然也就监听不到 第一次改变了
    searchText: {
      // 没有使用函数防抖
      // async handler() {
      //   // console.log('hello')
      //   // 监测到数据发生变化了 那么就该发请求 拿到对应的搜索提示
      //   // 1. 找到数据接口
      //   // 2. 封装请求方法
      //   // 3. 请求获取数据
      //   const { data } = await getSearchSuggestions(this.searchText)
      //   console.log(data)
      //   // 4. 数据绑定到模板上展示
      //   this.suggestions = data.data.options
      // },

      // 使用函数防抖
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),

      immediate: true
    }
  }
}
</script>
