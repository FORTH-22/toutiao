1. 创建好项目 需要创建 git 仓库吗？

#### 使用 vue-cli 创建好项目后 会自动 创建一个 git 仓库

2. 删除远程仓库

#### git remote remove origin

3. 因 prettier 格式化的问题 eslint 报了三个错误 分别是 字符串不能是 双引号 最后一行没有逗号 以及 加了分号

#### 解决方法两种

#### 1. 配置 .prettierrc (目前采用的方法) CSDN 找到

#### 2. 配置 eslint 格式化 vue 代码 CSDN 找到 (有点麻烦 没有用这种)

4. 添加 api 文件

#### 存储接口封装

5. 添加 utils 文件

#### 存储一些工具模块

6. 添加 styles 文件

#### 全局样式

7. main.js 引入 styles/index.less 时 报错：Import in body of module; reorder to top import/first

#### 解决：将 import "../style/type.css";放在所有业务前面

8. 了解到一个 介绍 vue 组件库的 github 仓库

https://github.com/vuejs/awesome-vue

9. 引入组件库 往往有 两种方式

#### 全局引用 缺点：体积大 优点：全局注册后 可以直接用 不需要多使用一个组件就要多注册一次

#### 按需引用 体积小 但是 多用一个组件 就要多注册一次

10. 移动端 适配方案

#### lib-flexible 这个项目目前不再维护 但是视频用的这个 知道就好 还是要学习适配的原理是什么

#### postcss-px-to-viewport 是一款 PostCSS 插件，用于将 px 单位转化为 vw/vh 单位。 也不再维护 只是视频需要

#### 但要 注意 行内像素 不会 转到 rem 其他均可

11. CSS 预处理工具 PostCSS

#### 很重要 Vue CLI 默认集成了 PostCSS

12. .browserslistrc 配置文件是干嘛的?

#### 指定项目的可以兼容到的浏览器的范围。这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

13. 下载 PS 调整 设计稿 图片的 分辨率

14. 想从 github git clone 直接拉代码 发现 ping 不通 github.com

#### 解决方案 直接改 C:\Windows\System32\drivers\etc\hosts 文件

#### 参考 CSDN https://blog.csdn.net/harry_yaya/article/details/107484793?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165003677116780264099735%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=165003677116780264099735&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-5-107484793.142^v9^pc_search_result_control_group,157^v4^new_style&utm_term=ping+github.com%E8%AF%B7%E6%B1%82%E8%B6%85%E6%97%B6&spm=1018.2226.3001.4187

15. git clone 速度太慢(还未找到解决方案)

#### 目前最优解 https://blog.csdn.net/shahuhu000/article/details/83965642?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165003765416780269830395%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165003765416780269830395&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-83965642.142^v9^pc_search_result_control_group,157^v4^new_style&utm_term=git+clone+%E9%80%9F%E5%BA%A6%E6%85%A2&spm=1018.2226.3001.4187
