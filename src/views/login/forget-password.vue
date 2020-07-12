<template>
  <div class="forget-container">
    <div class="top">
      <img src="@/assets/loogo.png" class="logo" />
    </div>
    <div class="content">
      <div class="goback" @click="toLogin">
        <a href="javascript:void(0)">返回登录</a>
      </div>
      <div class="login-form-container">
        <div class="steps">
          <div class="step" :class="step === 1 ? 'active' : ''">1</div>
          <div class="line" />
          <div class="step" :class="step === 2 ? 'active' : ''">2</div>
          <div class="line" />
          <div class="step" :class="step === 3 ? 'active' : ''">3</div>
        </div>
        <div class="steps-words">
          <span :class="step === 1 ? 'active' : ''">信息验证</span>
          <span :class="step === 2 ? 'active' : ''">修改密码</span>
          <span :class="step === 3 ? 'active' : ''">修改完成</span>
        </div>
        <el-form
          v-show="step === 1"
          ref="loginForm"
          :model="loginForm"
          :rules="currentMode == 1 ? loginRules : loginRules2"
          class="login-form"
          autocomplete="on"
          label-position="left"
          size="large"
        >
          <div class="lf-inner">
            <el-form-item prop="phone">
              <el-input
                ref="phone"
                v-model="loginForm.phone"
                placeholder="请输入手机号"
                name="phone"
                type="text"
                tabindex="1"
                auto-complete="off"
              />
            </el-form-item>
            <div class="tips">
              <p>1. 密码长度为8-16位</p>
              <p>2. 需要包含数字、字母、符号至少2种形式</p>
            </div>
            <el-form-item prop="verifyCode">
              <el-input
                ref="verifyCode"
                v-model="loginForm.verifyCode"
                placeholder="请输入验证码"
                name="verifyCode"
                type="text"
                tabindex="1"
                autocomplete="off"
                style="width:224px;"
              />
              <el-button
                v-loading="messageloading"
                :disabled="btnDisable"
                class="get-checkcode"
                @click="sendLoginCode"
              >{{ loginSendBtnText }}</el-button>
            </el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;height:48px;line-height:24px;"
              @click.native.prevent="handleNext"
            >下一步</el-button>
          </div>
        </el-form>
        <el-form
          v-show="step === 2"
          ref="passwordForm"
          :model="passwordForm"
          class="login-form"
          autocomplete="on"
          label-position="left"
          size="large"
        >
          <div class="lf-inner">
            <el-form-item prop="phone">
              <el-input
                ref="newpassword"
                v-model="passwordForm.newpassword"
                placeholder="请设置您的密码"
                name="phone"
                type="password"
                tabindex="1"
                auto-complete="off"
              />
            </el-form-item>
            <div class="tips">
              <p>1. 密码长度为8-16位</p>
              <p>2. 需要包含数字、字母、符号至少2种形式</p>
            </div>
            <el-form-item prop="verifyCode">
              <el-input
                ref="confirmpassword"
                v-model="passwordForm.confirmpassword"
                placeholder="请确认密码验证码"
                name="verifyCode"
                type="password"
                tabindex="1"
                autocomplete="off"
              />
            </el-form-item>
            <el-button
              :loading="confirmLoading"
              type="primary"
              style="width:100%;height:48px;line-height:24px;"
              @click.native.prevent="updatePassword"
            >下一步</el-button>
          </div>
        </el-form>
        <div class="finish" v-if="step === 3">
          <img class="finish-icon" src="@/assets/finish.png">
          <p>修改完成，请重新登录</p>
          <el-button
            type="primary"
            style="width:100%;height:48px;line-height:24px;"
            @click.native.prevent="toLogin"
          >确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.forget-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f2f5;
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    background-color: #fff;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    padding:20px 60px;
    .logo {
      width: 215px;
      height: 69.33px;
    }
  }
  .content {
    position: relative;
    margin-top: 90px;
    width: 850px;
    height: 540px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 6px;
    padding: 50px;
    .goback {
      position: absolute;
      left: 0;
      top: -50px;
      font-size: 18px;
      font-weight: 800;
    }
    .login-form-container {
      top: calc(50% - 250px);
      bottom: 0;
      left: 0;
      right: 0;
      width: 500px;
      height: 500px;
      margin: 0 auto;
      .finish {
        margin: 50px auto 0 auto;
        width: 310px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .finish-icon {
          width: 62px;
          height: 62px;
        }
      }
      .active {
        color: #1F71FF !important;
        border-color: #1F71FF !important;
      }
      .steps-words {
        color: #666666;
        padding: 0 35px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .steps {
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .step {
          width: 66px;
          height: 66px;
          border-radius: 33px;
          border: 1px solid #ccc;
          font-size: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          color: #ccc;
          margin: 0 10px;
        }
        .line {
          width: 100px;
          height: 1px;
          background-color: #ccc;
        }
      }
      .login-form {
        width: 380px;
        position: relative;
        margin: 0 auto;
        overflow: hidden;
      }
      .lf-inner {
        padding: 20px;
        position: relative;
        .el-form-item {
          // margin-bottom: 4/2px;
          .el-input--medium {
            .el-input__inner {
              height: 42px !important;
              line-height: 42px !important;
            }
          }
        }
        .tips {
          color: #FF9700;
          font-size: 13px;
          padding: 0px 0 15px 0;
        }
        .get-checkcode {
          border: 1px solid $themeBlue;
          color: $themeBlue;
        }
        .switch {
          color: $themeBlue;
          width: 100%;
          height: 40px;
          font-size: 13px;
          font-weight: 800;
          @extend .flex;
          @extend .flex-row;
          .secure-icon {
            width: 12px;
            height: 14px;
            margin-right: 5px;
          }
        }
        .options {
          height: 50px;
          font-size: 12px;
          line-height: 50px;
          @extend .flex;
          @extend .flex-row;
          @extend .flex-justify-end;
          .link {
            color: $textMidDark;
            text-decoration: underline;
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>

<script>
import { sendForgetPasswordCode, updateForgetPassword } from '@/api/user'
export default {
  data() {
    return {
      step: 1,
      loginForm: {
        phone: '',
        verifyCode: ''
      },
      passwordForm: {
        newpassword: '',
        confirmpassword: ''
      },
      messageloading: false,
      currentCode: '',
      btnDisable: false,
      loginRules: {},
      loginSendBtnText: '获取验证码',
      confirmLoading: false
    }
  },
  methods: {
    toLogin() {
      this.$router.back()
    },
    async updatePassword() {
      const passwordForm = this.passwordForm
      if (passwordForm.newpassword.length < 8 || passwordForm.newpassword.length > 16) {
        this.$message({ type: 'error', message: '密码长度必须在8-16位之间！' })
        return
      }
      if (passwordForm.newpassword !== passwordForm.confirmpassword) {
        this.$message({ type: 'error', message: '两次输入密码不一致！' })
        return
      }
      this.confirmLoading = true
      const params = {
        phone: this.loginForm.phone,
        newPwd: passwordForm.newpassword,
        verifyCode: this.currentCode
      }
      const { success, message } = await updateForgetPassword(params)
      this.confirmLoading = false
      if (success) {
        this.$message({ type: 'success', message: '密码修改成功，请重新登录！' })
        this.step = 3
      } else {
        this.$message({ type: 'error', message: message })
      }
    },
    handleNext() {
      const loginForm = this.loginForm
      if (loginForm.phone.length !== 11) {
        this.$message({ type: 'error', message: '请正确填写11位手机号！' })
        return
      }
      if (!loginForm.verifyCode) {
        this.$message({ type: 'error', message: '请填写验证码！' })
        return
      }
      if (loginForm.verifyCode !== this.currentCode) {
        this.$message({ type: 'error', message: '验证码错误！' })
        return
      }
      this.step = 2
    },
    async sendLoginCode() {
      if (this.loginForm.phone.length !== 11) {
        this.$message({ type: 'error', message: '请正确填写11位手机号！' })
        return
      }
      this.messageloading = true
      const { success, message } = await sendForgetPasswordCode({ phone: this.loginForm.phone })
      this.messageloading = false
      if (success) {
        let count = 60
        this.btnDisable = true
        this.currentCode = message
        const handle = setInterval(_ => {
          if (count > 0) {
            count--
            this.loginSendBtnText = `${count}秒重发`
          } else {
            clearInterval(handle)
            this.btnDisable = false
            this.loginSendBtnText = '获取验证码'
          }
        }, 1000)
      } else {
        this.$message({ type: 'error', message: '短信发送失败，请联系管理员！' })
      }
    }
  }
}
</script>
