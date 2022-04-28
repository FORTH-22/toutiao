<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </div>
</template>

<script>
// 引入 修改资料的 请求方法
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',

  data() {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },

  props: ['value'],

  methods: {
    // 确定修改
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true
      })
      // 请求后端更新用户昵称
      await updateUserProfile({
        gender: this.defaultIndex
      })

      // 更新前端的数据
      this.$emit('input', this.defaultIndex)

      this.$toast.success({
        message: '修改成功',
        forbidClick: true
      })

      // 关闭弹出层
      this.$emit('close')
    },

    // 取消修改
    onCancel() {
      this.$emit('close')
    },
    onChange(picker, value, index) {
      this.defaultIndex = index
    }
  }
}
</script>

<style></style>
