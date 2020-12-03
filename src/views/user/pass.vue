<template>
  <div class="page-container page-user-pass">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="100px">
      <el-form-item label="当前密码"
        prop="oldPass">
        <el-input placeholder="请输入当前密码"
          autocomplete="off"
          type="password"
          v-model="form.oldPass" />
      </el-form-item>
      <el-form-item label="新密码"
        prop="newPass1">
        <el-input placeholder="请输入新密码"
          autocomplete="off"
          type="password"
          v-model="form.newPass1" />
      </el-form-item>
      <el-form-item label="确认密码"
        prop="newPass2">
        <el-input placeholder="请再次输入新密码"
          autocomplete="off"
          type="password"
          v-model="form.newPass2" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
          :disabled="isSaving"
          :loading="isSaving"
          @click="handleConfirm">
          确定修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePass } from '@/api/sys'
import { isEmpty } from '@/utils'
import { isValidPassword } from '@/utils/validate'

export default {
  name: 'page-user-pass',
  data() {
    const validator1 = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入当前密码'))
      } else if(!isValidPassword(value)) {
        callback(new Error('密码格式错误'))
      } else {
        callback()
      }
    }

    const validator2 = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入新密码'))
      } else if(!isValidPassword(value)) {
        callback(new Error('密码格式错误'))
      } else {
        if (!isEmpty(this.form.newPass2)) {
          this.$refs.form.validateField('newPass2')
        }
        callback()
      }
    }

    const validator3 = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请再次输入新密码'))
      } else if(!isValidPassword(value)) {
        callback(new Error('密码格式错误'))
      } else if (!isEmpty(this.form.newPass1) && value !== this.form.newPass1) {
        callback(new Error('两次输入的新密码不一致'));
      } else {
        callback()
      }
    }

    return {
      form: {
        oldPass: null,
        newPass1: null,
        newPass2: null
      },
      rules: {
        oldPass: [
          { required: true, validator: validator1, trigger: ['blur', 'change'] }
        ],
        newPass1: [
          { required: true, validator: validator2, trigger: ['blur', 'change']}
        ],
        newPass2: [
          { required: true, validator: validator3, trigger: ['blur', 'change']}
        ]
      },
      isSaving: false
    }
  },

  methods: {
    clearForm() {
      this.form.oldPass = null
      this.form.newPass1 = null
      this.form.newPass2 = null
      // this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
    },

    updateUserPass() {
      this.isSaving = true
      const newPass = this.form.newPass1
      const oldPass = this.form.oldPass
      updatePass(newPass, oldPass)
        .then(res => {
          if (res.success && res.entity) {
            this.$message.success('更新密码成功')
            this.clearForm()
          } else {
            this.$message.success(res.message || '更新密码失败')
          }
        })
        .catch(err => {
          this.$message.success(err.message || '更新密码失败')
        })
        .finally(() => {
          this.isSaving = false
        })
    },
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updateUserPass()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-user-pass {
  .el-form {
    max-width: 400px;
  }
}
</style>
