<template>
  <div class="page-forget">
    <div class="section is-title">
      <span class="title">
        找回密码
      </span>
    </div>

    <div class="section is-form">
      <el-form :model="forget1Form"
        :rules="forget1Rules"
        ref="forget1Form">
        <el-form-item prop="brand">
          <el-input type="text"
            placeholder="请输入品牌服务码"
            v-model="forget1Form.brand"
            autocomplete="off"
            clearable />
        </el-form-item>

        <el-form-item prop="mobile">
          <el-input type="text"
            placeholder="请输入手机号码"
            v-model="forget1Form.mobile"
            autocomplete="off"
            maxlength="11"
            autofocus
            clearable />
        </el-form-item>

        <el-form-item prop="verifycode">
          <el-input type="text"
            placeholder="请输入短信验证码"
            v-model="forget1Form.verifycode"
            autocomplete="off"
            maxlength="6"
            clearable>
            <template slot="append">
              <span class="line">
                |
              </span>
              <el-button type="text"
                @click="getSmsCode()"
                :disabled="btnDisabled">
                {{ btnText }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="pass1">
          <el-input :type="pass1Type"
            placeholder="请输入新密码"
            v-model="forget1Form.pass1"
            autocomplete="off"
            show-password />
        </el-form-item>

        <el-form-item prop="pass2">
          <el-input :type="pass2Type"
            placeholder="请再次输入新密码"
            v-model="forget1Form.pass2"
            autocomplete="off"
            show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
            @click="submitForm('forget1Form')">
            设置新密码
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="section is-signin">
      <router-link :to="{name: 'signin'}">
        <div class="signin">
          返回密码登录
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { isEmpty } from '@/utils'
import { isvalidUsername, isValidPassword } from '@/utils/validate'
import { getSmsCode } from '@/api/message'
import { findPass } from '@/api/sys'
import { SUCCESS_STATUS_CODE } from '@/utils/const'

export default {
  name: 'forget',
  data() {
    const validateMobi = (rule, value, callback) => {
      if (isEmpty(value)) {
        this.btnDisabled = true
        callback(new Error('请输入手机号码'))
      } else if(!isvalidUsername(value)) {
        this.btnDisabled = true
        callback(new Error('手机号码格式错误'))
      } else {
        this.btnDisabled = false
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

    const validatePass1 = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入密码'))
      } else if(!isValidPassword(value)) {
        callback(new Error('请输入由字母、数字、下划线组成的6～12位密码'))
      } else {
        if (!isEmpty(this.forget1Form.pass2)) {
          this.$refs.forget1Form.validateField('pass2')
        }
        callback()
      }
    }

    const validatePass2 = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入密码'))
      } else if(!isValidPassword(value)) {
        callback(new Error('请输入由字母、数字、下划线组成的6～12位密码'))
      }else if (!isEmpty(this.forget1Form.pass1) && value !== this.forget1Form.pass1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback()
      }
    }

    const validateBrand = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入品牌服务码'))
      } else {
        callback()
      }
    }

    return {
      forget1Form : {
        mobile: '',
        verifycode: '',
        pass1: '',
        pass2: '',
        brand: ''
      },
      pass1Type: 'password',
      pass2Type: 'password',
      btnDisabled: true,
      btnText: '获取验证码',
      hasSend: false,
      count: 60,
      forget1Rules: {
        mobile: [
          { validator: validateMobi, trigger: ['blur', 'change']}
        ],
        verficode: [
          { validator: validateCode, trigger: ['blur', 'change']}
        ],
        pass1: [
          { validator: validatePass1, trigger: ['blur', 'change']}
        ],
        pass2: [
          { validator: validatePass2, trigger: ['blur', 'change']}
        ],
        brand: [
          { validator: validateBrand, trigger: ['blur', 'change']}
        ]
      }
    }
  },
  methods: {
    showPass1() {
      if (this.pass1Type === 'password') {
        this.pass1Type = 'text'
      } else {
        this.pass1Type = 'password'
      }
    },

    showPass2() {
      if (this.pass2Type === 'password') {
        this.pass2Type = 'text'
      } else {
        this.pass2Type = 'password'
      }
    },

    getSmsCode() {
      const params = {
        mobile: this.forget1Form.mobile,
        type: 2 //找回密码
      }

      getSmsCode(params)
        .then(res => {
          if (res.success && res.entity) {
            this.hasSend = true
            this.btnDisabled = true
            let interval = setInterval(() => {
              this.btnText = '（' + this.count + '秒）后重新发送';
              --this.count;
              if(this.count < 0) {
                this.btnText = "获取验证码"
                this.count = 60
                this.btnDisabled = false
                clearInterval(interval)
              }
            }, 1000)
          } else {
            this.$message.error(res.message || "获取验证码错误，请稍后重试！")
          }
        })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.hasSend) {
            this.$message.error("请获取验证码！")
            return
          }

          const f = this.forget1Form
          findPass(f.mobile, f.verficode, f.pass1, f.brand)
            .then(res => {
              if (res.success && res.entity) {
                this.$message.success('新密码设置成功！')
                setTimeout(() => {
                  this.$router.push({ name: 'signin' })
                },1000)
              } else {
                this.$message.error(res.message || "设置新密码失败，请稍后重试！")
              }
            })
            .catch(e => {
              this.$message.error(e.message || "设置新密码失败，请稍后重试！")
            })
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      let name = Cookies.get('loginname')
      let brand = Cookies.get('brandcode')

      if (!isEmpty(name)) {
        vm.forget1Form.mobile = name
      }

      if(!isEmpty(brand)) {
        vm.forget1Form.brand = brand
      }
    })
  }
}
</script>

<style lang="scss">
.page-forget {
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

      .el-input-group__append{
        width: 90px;
        background: #FFFFFF;
        border-top: none;
        border-right: none;
        border-radius: 0;
        text-align: right;
        font-size: 14px;
        color: #32B4C8;

        .line {
          margin-right: 15px;
          color: #DDDDDD;
        }

        .el-button{
          margin-right: -5px;
          text-align: right;
        }
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
.app-wapper.is-mobile .page-forget {
  padding-bottom: 30px;
}
</style>

<style lang="scss" scoped>
.page-forget {
  .section {
    display: flex;
    &.is-title {
      font-size: 18px;
      color: #333;
      padding-top: 76px;
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

        .el-form-item{
          .el-form-item__content{
            .el-button {
              width: 100%;
              border-radius: 4px;
            }
          }

          .pass-suffix {
            position: absolute;
            top: 0;
            right: 0;
            color: gray !important;
            background: transparent;
          }
        }
      }
    }

    &.is-signin {
      color: #949798;
      padding-right: 60px;
      text-decoration: underline;
      flex-flow: row-reverse;
      .signin {
        font-size: 12px;
      }
    }
  }
}
</style>
