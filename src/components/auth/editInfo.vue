<template>
  <el-dialog
    title="修改个人信息"
    :visible.sync="dialogVisible"
    width="486px"
    center
    @open="loadUserInfo"
    :before-close="handleClose"
    v-loading="isLoading">
    <div>
      <el-form 
        ref="form"
        class="user-form"
        :model="form"
        :rules="userRules"
        label-position="right"
        label-width="90px">
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="用户名"
              prop="userName">
              <el-input v-model.trim="form.userName" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="手机"
              prop="linkedPhone">
              <el-input v-model.trim="form.linkedPhone"
                :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="验证码"
              prop="verificationCode">
              <el-input 
                v-model.trim="form.verificationCode"
                placeholder="请输入短信验证码"
                maxlength="6"
                clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6"
            style="padding-left:0">
            <el-button 
              type="text"
              style="float:right"
              @click="getSmsCode()"
              :disabled="btnDisabled">
              {{ btnText }}
            </el-button>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="邮箱">
              <el-input v-model.trim="form.linkedMail" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer"
      class="dialog-footer">
      <el-button type="primary"
        @click="handleConfirm"
        :loading="isSubmiting"
        :disabled="isSubmiting || isLoading">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isEmpty } from '@/utils'
import { isPhone, isEmail } from '@/utils/validate'
import { SUCCESS_STATUS_CODE } from '@/utils/const'
import { getSmsCode } from '@/api/message'
import { getUserInfo, updateUserInfo } from '@/api/sys'

export default {
  name: 'info-edit',
  props:{
    visible: Boolean
  },
  data(){
    const validateName = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

    const validatePhone = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入手机号码'))
      } else if (!isPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }

    const validateCode = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入短信验证码'))
      } else if(value.length < 6) {
        callback(new Error('短信验证码长度错误'))
      } else {
        callback()
      }
    }

    const validateEmail = (rule, value, callback) => {
      if(!isEmpty(value)) {
        if(isEmail(value)) {
          callback(new Error('请输入正确邮箱！'))
        }
      }
    }

    return {
      form: {
        id: null,
        userName: null,
        linkedMail: null,
        linkedPhone: null,
        verificationCode: null
      },
      dialogVisible: this.visible,
      isLoading: false,
      isSubmiting: false,
      userRules: {
        userName: [{ required: true, trigger: 'blur', validator: validateName }],
        linkedPhone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        linkedMail: [{trigger: 'blur', validator: validateEmail}],
        verificationCode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      count: 60,
      hasSend: false,
      timer: null
    }
  },

  methods: {
    startTimer() {
      this.clearTimer()
      this.count--
      this.timer = setInterval(() => {
        let i = this.count
        if (i < 1) {
          this.count = 60
          this.clearTimer()
        } else {
          this.count = i - 1
        }
      }, 1000)
    },

    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
        this.count = 60
      }
    },

    getSmsCode() {
      if(isEmpty(this.form.linkedPhone)){
        this.$message.warning('请先输入手机号！')
        return false
      }
      const params = {
        mobile: this.form.linkedPhone,
        type: 1 //验证码
      }
      this.startTimer()
      getSmsCode(params).then(res => {
        if (res.success && res.entity) {
          this.hasSend = true
        } else {
          this.$message.error(res.message || "获取验证码错误，请稍后重试！")
          this.clearTimer()
        }
      })
    },
    handleClose(done) {
      this.$emit('close')
      done()
    },

    doUpdateInfo() {
      this.isSubmiting = true
      const data = this.form
      updateUserInfo(data)
        .then(res => {
          this.isSubmiting = false
          if (res.success && res.entity) {
            this.$message.success('编辑个人信息成功！')
            this.$emit('success')
          } else {
            this.$message.error(res.message || '编辑个人信息失败！')
          }
        })
        .catch(err => {
          this.isSubmiting = false
          this.$message.error('编辑个人信息失败！')
        })
    },

    loadUserInfo() {
      this.isLoading = true
      getUserInfo()
        .then(res => {
          this.isLoading = false
          if (res.success) {
            const v = res.entity
            this.form.id = v.id
            this.form.userName = v.userName
            this.form.linkedPhone = v.linkedPhone
            this.form.linkedMail = v.linkedMail
            this.form.verificationCode = v.verificationCode
          } else {
            this.$message.error('加载个人信息失败！')
          }
        })
        .catch(err => {
          this.isLoading = false
          this.$message.error('加载个人信息失败！')
        })
    },

    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.doUpdateInfo()
        }
      })
    }
  },

  computed: {
    btnText() {
      if (this.timer) {
        return `${this.count}秒后重新发送`
      } else {
        return '获取验证码'
      }
    },
    btnDisabled:{
      get() {
        return !isEmpty(this.timer)
      },
      set(v) {
        if(isEmpty(this.timer)) {
          return true
        }
      }
      
    }
  },

  watch: {
    visible(val) {
      this.dialogVisible = val
      if(!val) {
        this.clearTimer()
        this.$refs.form.clearValidate()
        this.form.linkedMail = null
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

