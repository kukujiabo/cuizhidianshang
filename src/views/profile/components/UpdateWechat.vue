<template>
  <div>
    <el-dialog
      width="500px"
      title="修改微信号"
      :visible.sync="visible"
    >
      <div class="update-phone-dialog-form">
        <el-form
          ref="updatePhoneForm"
          :model="updateForm"
          class="login-form"
          autocomplete="on"
          :inline="false"
        >
          <el-form-item label="输入新的微信号" prop="newWechat">
            <el-input
              ref="newWechat"
              v-model="updateForm.newWxNo"
              placeholder="请输入微信号"
              name="newWechat"
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
import { sendUpdatePhoneCode, updateWechat } from '@/api/user'

export default {
  name: 'UpdateWechat',
  data() {
    return {
      visible: false,
      sendBtnText: '获取验证码',
      sendBtnDisable: false,
      updateForm: {
        newWxNo: ''
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
      if (!this.updateForm.newWxNo) {
        this.$message({ type: 'success', message: '微信号不能为空!' })
        return
      }
      try {
        // const { success, message } = await updateWechat({ newWxNo: this.updateForm.newWxNo })
        // if (success) {
        //   this.$message({ type: 'success', message: '修改成功' })
        //   this.closeBox()
        // } else {
        //   this.$message({ type: 'error', message })
        // }
        this.$store.dispatch('user/updateUserWxNo', this.updateForm).then(() => {
          this.$message({ type: 'success', message: '微信号已修改！' })
          this.closeBox()
        })
      } catch (error) {
        console.log(error)
        this.$message({ type: 'error', message: '网络错误！' })
      }
    }
  }
}
</script>
