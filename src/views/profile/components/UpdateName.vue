<template>
  <div>
    <el-dialog
      width="500px"
      title="修改姓名"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="update-phone-dialog-form">
        <el-form
          ref="updatePhoneForm"
          :model="updateForm"
          class="login-form"
          autocomplete="on"
          :inline="false"
          :show-message="false"
        >
          <el-form-item label="姓名" prop="userName">
            <el-input
              ref="userName"
              v-model="updateForm.userName"
              placeholder="请输入姓名"
              name="userName"
              type="text"
              tabindex="1"
              auto-complete="off"
            />
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
        userName: ''
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
    async doUpdate() {
      this.$refs.updatePhoneForm.validate(async valid => {
        if (valid) {
          try {
            this.$store.dispatch('user/updateUserName', this.updateForm).then(() => {
              this.$message({ type: 'success', message: '姓名已修改！' })
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
