<template>
  <div>
    <el-dialog
      width="500px"
      title="修改手机号"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="update-phone-dialog-form">
        <el-form
          ref="updatePhoneForm"
          :model="updateForm"
          :rules="updateRules"
          class="login-form"
          autocomplete="on"
          :inline="false"
        >
          <el-form-item label="输入新手机号" prop="newPhone">
            <el-input
              ref="newPhone"
              v-model="updateForm.newPhone"
              placeholder="请输入手机号"
              name="newPhone"
              type="text"
              tabindex="1"
              auto-complete="off"
            />
          </el-form-item>
          <el-form-item label="验证码" prop="verifyCode">
            <el-input
              ref="verifyCode"
              v-model="updateForm.verifyCode"
              placeholder="请输入验证码"
              name="verifyCode"
              type="text"
              tabindex="1"
              autocomplete="off"
              style="width:260px;"
            />
            <el-button
              :disabled="sendBtnDisable"
              type="primary"
              class="get-checkcode"
              @click="sendCode"
            >{{ sendBtnText }}</el-button>
          </el-form-item>
          <div class="operation">
            <el-button type="default" @click="closeBox">取消</el-button>
            <el-button class="submit" type="primary" @click="doUpdate">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";

.update-phone-dialog-form {
  padding: 10px 40px;
  .el-input {
    width: 370px;
    height: 48px;
    line-height: 48px;
    background-color: $lightBackground;
    border-radius: 8px;
    margin-top: 10px;
    input {
      border: 0;
      height: 48px;
      line-height: 48px;
      background-color: $lightBackground;
    }
  }
  .el-button {
    border: 0;
    height: 48px;
    line-height: 24px;
  }
  .el-form-item {
    @extend .flex;
    @extend .flex-column;
    @extend .flex-align-start;
  }
  .operation {
    margin-top: 50px;
    @extend .flex;
    @extend .flex-row;
    @extend .flex-justify-end;
  }
}
</style>

<script>
import { sendUpdatePhoneCode } from '@/api/user'

export default {
  name: 'UpdatePhoneBox',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value.length !== 11) {
        callback(new Error('请正确填写11位手机号！'))
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
      visible: false,
      sendBtnText: '获取验证码',
      sendBtnDisable: false,
      updateForm: {
        newPhone: '',
        verifyCode: ''
      },
      updateRules: {
        newPhone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
      }
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    closeBox() {
      this.visible = false
    },
    async sendCode() {
      if (this.updateForm.newPhone.length !== 11) {
        this.$message({ type: 'error', message: '请正确填写11位手机号！' })
        return
      }
      try {
        this.sendBtnDisable = true
        await sendUpdatePhoneCode({ phone: this.updateForm.newPhone })
        this.$message({ type: 'success', message: '验证码已发送！' })
        let count = 60
        const sendInterval = setInterval(_ => {
          count--
          if (count < 0) {
            clearInterval(sendInterval)
            this.sendBtnText = '获取验证码'
            this.sendBtnDisable = false
          } else {
            this.sendBtnText = `${count}秒后重发`
          }
        }, 1000)
      } catch (error) {
        this.sendBtnDisable = false
        this.$message({ type: 'error', message: error.message })
      }
    },
    async doUpdate() {
      this.$refs.updatePhoneForm.validate(async valid => {
        if (valid) {
          try {
            this.$store.dispatch('user/updatePhone', this.updateForm).then(() => {
              this.$message({ type: 'success', message: '手机号已修改！' })
              this.visible = false
            })
          } catch (error) {
            this.$message({ type: 'error', message: error.message })
            return false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
