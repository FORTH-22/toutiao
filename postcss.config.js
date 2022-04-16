// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 转换的根元素的基准值
      // 如果设计稿是750 那么就是 750 / 10 = 75
      // 375 / 10 = 75
      rootValue: 37.5,

      // 所有CSS属性都要转换
      propList: ['*']
    }
  }
}
