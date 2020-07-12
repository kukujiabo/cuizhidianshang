<template>
  <div class="login-container">
    <div class="login-image">
      <div class="image-container"></div>
    </div>
    <div class="login-info">
      <div class="login-form-container">
        <div class="logo">
          <img src="@/assets/loogo.png" />
        </div>

        <!-- 注册 -->

        <el-card v-if="formType === 1">
          <el-form
            ref="registerForm"
            :model="registerForm"
            :rules="registerRule"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <div class="lf-inner">
              <div v-if="formType === 2" class="half-qrcode">
                <img src="@/assets/half-qrcode.png">
              </div>
              <div class="title-container">
                <p class="title">{{ formType == 2 ? '密码登录' : '账号注册' }}</p>
              </div>
              <el-form-item prop="phone">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  ref="phone"
                  v-model="registerForm.phone"
                  placeholder="请输入手机号"
                  name="phone"
                  type="text"
                  tabindex="1"
                  auto-complete="off"
                />
              </el-form-item>
              <el-form-item
                prop="verifyCode"
              >
                <span class="svg-container">
                  <svg-icon icon-class="message" />
                </span>
                <el-input
                  ref="verifyCode"
                  v-model="registerForm.verifyCode"
                  placeholder="请输入验证码"
                  name="verifyCode"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                  style="width:140px;"
                />
                <el-button
                  :disabled="registerBtnDisable"
                  class="get-checkcode"
                  @click="sendRegisterCode"
                >{{ registerBtnText }}
                </el-button>
              </el-form-item>
              <el-tooltip
                v-model="capsTooltip"
                content="大写字母已开启"
                placement="right"
                manual
              >
                <el-form-item prop="pwd">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input
                    ref="pwd"
                    :key="passwordType"
                    v-model="registerForm.pwd"
                    :type="passwordType"
                    placeholder="请输入密码"
                    name="pwd"
                    tabindex="2"
                    autocomplete="off"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                  />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </el-form-item>
              </el-tooltip>
              <div class="agreement">
                <el-checkbox v-model="agreementChecked" checked />
                <span>&nbsp;我已同意 </span>
                <a style="color:#1F71FF">《XXX用户使用协议》</a>
              </div>
              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;height:48px;line-height:24px;"
                @click.native.prevent="handleRegister"
              >立即注册
              </el-button>
              <div class="options">
                <a class="link" style="text-decoration:none" href="javascript:void(0);">已有账号？</a>
                <a class="link" style="color:#1F71FF;margin-left:5px" href="javascript:void(0);" @click="formType = 2">去登录</a>
              </div>
            </div>
          </el-form>
        </el-card>

        <!-- 登录 -->

        <el-card v-if="formType === 2">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="currentMode == 1 ? loginRules : loginRules2"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <div class="lf-inner">
              <div class="half-qrcode">
                <img src="@/assets/half-qrcode.png">
              </div>
              <div class="title-container">
                <p class="title">{{ currentMode == 1 ? '密码登录' : '验证码登录' }}</p>
              </div>
              <el-form-item prop="phone">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
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

              <el-tooltip
                v-if="currentMode === 1"
                v-model="capsTooltip"
                content="大写字母已开启"
                placement="right"
                manual
              >
                <el-form-item prop="pwd">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input
                    ref="pwd"
                    :key="passwordType"
                    v-model="loginForm.pwd"
                    :type="passwordType"
                    placeholder="请输入密码"
                    name="pwd"
                    tabindex="2"
                    autocomplete="off"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                  />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </el-form-item>
              </el-tooltip>

              <el-form-item
                v-if="currentMode === 2"
                prop="verifyCode"
              >
                <span class="svg-container">
                  <svg-icon icon-class="message" />
                </span>
                <el-input
                  ref="verifyCode"
                  v-model="loginForm.verifyCode"
                  placeholder="请输入验证码"
                  name="verifyCode"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                  style="width:140px;"
                />
                <el-button :disabled="loginSendBtnDisable" class="get-checkcode" @click="sendLoginCode">{{ loginSendBtnText }}</el-button>
              </el-form-item>
              <div v-if="currentMode === 1" class="switch">
                <img class="secure-icon" src="@/assets/secure-message.png">
                <a href="javascript:void(0);" @click="currentMode = 2">验证码登录</a>
              </div>
              <div v-if="currentMode === 2" class="switch">
                <a href="javascript:void(0);" @click="currentMode = 1">密码登录</a>
              </div>
              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;height:48px;line-height:24px;"
                @click.native.prevent="handleLogin"
              >登录
              </el-button>
              <div class="options">
                <a class="link" href="javascript:void(0);" @click="formType = 1">免费注册</a>
                <a class="link" href="javascript:void(0);" @click="toForget">忘记密码</a>
              </div>
            </div>
          </el-form>
        </el-card>
      </div>
      <div class="copy-right">
        <p>Copyright © 2019-2025 TunzhouTech All Rights Reserved.</p>
      </div>
    </div>
    <!-- <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog> -->
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { sendRegisterVerifyCode, sendLoginVerifyCode, register } from '@/api/user'

export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请正确输入手机号！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不得少于6位！'))
      } else {
        callback()
      }
    }
    const validateVerifyCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写验证码！'))
      } else {
        callback()
      }
    }
    return {
      loginSendBtnDisable: false,
      agreementChecked: false,
      registerBtnDisable: false,
      loginSendBtnText: '获取验证码',
      registerBtnText: '获取验证码',
      registerForm: {
        phone: '',
        verifyCode: '',
        pwd: ''
      },
      registerRule: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }],
        pwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loginForm: {
        phone: '',
        pwd: '',
        verifyCode: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        pwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loginRules2: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
      },
      formType: 2,
      currentMode: 1,
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    // if (this.loginForm.username === '') {
    //   this.$refs.phone.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    toForget() {
      this.$router.push({ path: '/forget' })
    },
    async handleRegister() {
      try {
        this.$refs.registerForm.validate(async valid => {
          if (valid) {
            await register(this.registerForm)
            this.$message({ type: 'success', message: '注册成功，请登录！' })
            this.formType = 2
            return true
          } else {
            return false
          }
        })
      } catch (error) {
        this.$message({ type: 'error', message: error.message })
      }
    },

    /**
     * 发送登录验证码
     */
    async sendLoginCode() {
      const { phone } = this.loginForm
      if (phone.length !== 11) {
        this.$message({ type: 'error', message: '请正确填写11位手机号！' })
        return
      }
      try {
        this.loginSendBtnDisable = true
        await sendLoginVerifyCode({ phone })
        this.$message({ type: 'success', message: '验证码已发送' })
        let count = 60
        const intervalHandler = setInterval(_ => {
          count--
          if (count < 0) {
            clearInterval(intervalHandler)
            this.loginSendBtnText = '获取验证码'
          } else {
            this.loginSendBtnText = `${count}秒后重发`
          }
        }, 1000)
      } catch (error) {
        this.loginSendBtnDisable = false
        this.$message({ type: 'error', message: error.message })
      }
    },

    /**
     * 发送注册验证码
     */
    async sendRegisterCode() {
      const { phone } = this.registerForm
      if (phone.length !== 11) {
        this.$message({ type: 'error', message: '请正确填写11位手机号！' })
        return
      }
      try {
        this.registerBtnDisable = true
        await sendRegisterVerifyCode({ phone })
        this.$message({ type: 'success', message: '验证码已发送！' })
        let count = 60
        const intervalHandler = setInterval(_ => {
          count--
          if (count < 0) {
            clearInterval(intervalHandler)
            this.registerBtnText = '获取验证码'
          } else {
            this.registerBtnText = `${count}秒后重发`
          }
        }, 1000)
      } catch (error) {
        this.registerBtnDisable = false
        this.$message({ type: 'error', message: error.message })
      }
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.currentMode === 2) {
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({ path: '/' })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            this.$store.dispatch('user/pwdlogin', this.loginForm)
              .then(() => {
                this.$router.push({ path: '/' })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          }
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#FFFFFF;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $textDark;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent !important;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $textDark;
      height: 47px;
      caret-color: $textDark;
      // -webkit-tap-highlight-color:rgba(255,0,0,0);
      // -webkit-box-shadow: 0 0 0 1000px transparent inset;
      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }
    input::selection { background: transparent; }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: $lightBackground;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
@import '~@/styles/index.scss';

$bg:#FFFFFF;
$dark_gray:#889aa4;
$light_gray:#eee;
$black: #000000;
$light_background: #F3F5F7;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: relative;
  @extend .flex;
  @extend .flex-row;
  .login-image {
    flex: 1;
    background-color: $light_background;
    background-image: url('~@/assets/login_background.png');
    background-position: center center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    .image-container {
      position: absolute;
      height: 100%;
      top: 0;
    }
  }
  .login-info {
    flex: 1;
    position: relative;
    .agreement {
      font-size: 13px;
      height: 64px;
    }
    .copy-right {
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      height: 150px;
      font-size: 14px;
      color: $textMidDark;
      position: absolute;
      line-height: 150px;
      text-align: center;
    }
    .login-form-container {
      position: absolute;
      top: calc(50% - 250px);
      bottom: 0;
      left: 0;
      right: 0;
      width: 380px;
      height: 500px;
      margin: 0 auto;
      .logo {
        position: absolute;
        height: 200px;
        width: 380px;
        top: -200px;
        @extend .flex;
        @extend .flex-column;
        @extend .flex-justify-center;
        @extend .flex-align-center;
        img {
          width: 215px;
          height: 69.33px;
        }
        .company-name {
          margin: 16px 0;
          color: $themeBlue;
          font-weight: 800;
          font-size: 24px;
        }
      }
      .login-form {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
      }
      .lf-inner {
        padding: 20px;
        position: relative;
        .get-checkcode {
          border: 1px solid $themeBlue;
          color: $themeBlue;
        }
        .half-qrcode {
          position: absolute;
          right: 0;
          top: 0;
          width: 49px;
          height: 43px;
          img {
            width: 49px;
            height: 43px;
            border: {
              left: 1px dashed $borderGray;
              bottom: 1px dashed $borderGray;
            }
          }
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

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 18px;
      color: $black;
      margin: 0px auto 40px auto;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
