<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
// 引入 更改用户资料的 请求方法
import { updateUserProfile } from '@/api/user'
// 引入 dayjs
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  data() {
    return {
      minDate: new Date(2000, 0, 1),

      // 最大日期 肯定是现在
      maxDate: new Date(),

      // 目前选中的日期 可以传三个值 也可以传字符串 像这样'2020-05-06'
      currentDate: new Date(this.value)
    }
  },

  props: ['value'],

  methods: {
    // 取消修改
    onCancel() {
      this.$emit('close')
    },

    // 确认修改
    async onConfirm() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      // 请求后端更新用户昵称
      await updateUserProfile({
        birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
      })

      // 更新前端的数据
      this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))

      this.$toast.success({
        message: '修改成功',
        forbidClick: true
      })

      // 关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style></style>
