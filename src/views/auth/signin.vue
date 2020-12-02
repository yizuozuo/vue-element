<template>
  <div class="page-signin">
    <div class="section is-title">
      <span class="title">登录</span>
    </div>

    <div class="section is-form">
      <el-form :model="signInForm"
        :rules="signInRules"
        ref="signInForm"
        class="signin-form">
        <el-form-item prop="user">
          <el-input
            type="text"
            placeholder="请输入手机号码"
            v-model="signInForm.user"
            autocomplete="off"
            clearable />
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="signInForm.pass"
            autocomplete="off"
            clearable
            show-password />
        </el-form-item>
        <el-form-item class="bar">
          <el-col :span="12">
            <el-checkbox v-model="isRemberMe">
              记住用户名
            </el-checkbox>
          </el-col>
          <el-col :span="12"
            class="ta-r">
            <router-link :to="{name: 'forget'}">
              忘记密码
            </router-link>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="isLogining"
            :disabled="isLogining"
            @click="submitForm('signInForm')">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { isEmpty, getUrlQuery } from '@/utils'
import { isvalidUsername, isValidPassword } from '@/utils/validate'

export default {
  name: 'signin',
  data () {
    const validateMobi = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入手机号码'))
      } else if (!isvalidUsername(value)) {
        callback(new Error('手机号码格式错误'))
      } else {
        callback()
      }
    }

    const validatePass = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入密码'))
      } else if (!isValidPassword(value)) {
        callback(new Error('请输入由字母、数字、下划线组成的6～12位密码'))
      } else {
        callback()
      }
    }
    return {
      signInForm: {
        user: '',
        pass: ''
      },
      isRemberMe: true,
      isLogining: false,
      successUrl: '',
      signInRules: {
        user: [
          { validator: validateMobi, trigger: ['blur', 'change'] }
        ],
        pass: [
          { validator: validatePass, trigger: ['blur', 'change'] }
        ]
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isRemberMe) {
            Cookies.set('loginname', this.signInForm.user)
            // Cookies.set('brandcode', this.signInForm.brand)
          } else {
            Cookies.remove('loginname')
            // Cookies.remove('brandcode')
          }
          this.signIn()
        } else {
          return false
        }
      })
    },

    signIn () {
      this.isLogining = true
      this.$store
        .dispatch('LoginByUsername', this.signInForm)
        .then(() => {
          const url = this.successUrl
          if (isEmpty(url)) {
            this.$router.push({ path: '/' })
          } else {
            window.location.replace(url)
          }
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: err.message
          })
        })
        .finally(() => {
          this.isLogining = false
        })
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      let q = getUrlQuery()
      let name = Cookies.get('loginname')
      let pass = Cookies.get('loginpass')
      let url = q['returnUrl']

      if (!isEmpty(url)) {
        vm.successUrl = url
        console.log(`url = ${url}`)
      }

      if (!isEmpty(name)) {
        vm.signInForm.user = name
      }

      if (!isEmpty(pass)) {
        vm.signInForm.pass = pass
      }
    })
  }
}
</script>

<style lang="scss">
.page-signin {
  .el-form {
    .el-input {
      .el-input__inner {
        font-size: 14px;
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
        padding-left: 0;
        padding-right: 30px;
      }

      .el-input__suffix {
        right: 0;
        text-align: right;
        .el-input__icon {
          text-align: right;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.page-signin {
  .section {
    display: flex;

    &.is-signup {
      padding-top: 30px;
      flex-flow: row-reverse;
      .apply {
        font-size: 14px;
        background: #b1ded3;
        padding: 4px 17px 4px 22px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
      }
    }

    &.is-title {
      font-size: 18px;
      color: #333;
      padding-top: 22px;
      padding-left: 60px;

      .title {
        padding-bottom: 5px;
        border-bottom: 2px solid #32b4cb;
      }
    }

    &.is-form {
      .el-form {
        width: 100%;
        padding-left: 60px;
        padding-right: 60px;
        padding-top: 52px;

        .el-button {
          width: 100%;
          border-radius: 4px;
        }

        .bar {
          font-size: 12px;
          color: #949798;

          .el-checkbox {
            color: #949798;
          }
        }
      }
    }
  }
}
</style>
