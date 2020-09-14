<template>
  <div>
    <el-dialog
      width="500px"
      title="修改密码"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="onClose"
    >
      <div class="update-phone-dialog-form">
        <el-form
          ref="updatePhoneForm"
          :model="updateForm"
          :rules="updateRules"
          class="login-form"
          autocomplete="on"
          :show-message="false"
          :inline="false"
        >
          <el-form-item label="输入旧密码" prop="oldPwd">
            <el-input
              v-model="updateForm.oldPwd"
              placeholder="请输入旧密码"
              name="oldPwd"
              type="password"
              tabindex="1"
              auto-complete="off"
            />
          </el-form-item>
          <el-form-item required label="输入新密码" prop="newPwd">
            <el-input
              v-model="updateForm.newPwd"
              type="password"
              placeholder="请输入新密码"
              name="newPwd"
              tabindex="1"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input
              v-model="updateForm.confirmPassword"
              type="password"
              placeholder="请输入确认新密码"
              name="confirmPassword"
              tabindex="1"
              autocomplete="off"
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
function passwordLevel(password) {
  var Modes = 0;
  for (var i = 0; i < password.length; i++) {
    Modes |= CharMode(password.charCodeAt(i));
  }
  return bitTotal(Modes);

  //CharMode函数
  function CharMode(iN) {
    if (iN >= 48 && iN <= 57)
      //数字
      return 1;
    if (iN >= 65 && iN <= 90)
      //大写字母
      return 2;
    if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
      //大小写
      return 4;
    else return 8; //特殊字符
  }

  //bitTotal函数
  function bitTotal(num) {
    var modes = 0;
    for (var i = 0; i < 4; i++) {
      if (num & 1) modes++;
      num >>>= 1;
    }
    console.log(modes);
    return modes;
  }
}

export default {
  name: "UpdatePasswordBox",
  data() {
    return {
      visible: false,
      sendBtnDisable: false,
      updateForm: {
        oldPwd: "",
        newPwd: "",
        confirmPassword: "",
      },
      updateRules: {
        oldPwd: [{ required: true }],
        newPwd: [{ required: true }],
        confirmPassword: [{ required: true }],
      },
    };
  },
  methods: {
    onClose() {
      this.$refs.updatePhoneForm.resetFields();
    },
    show() {
      this.visible = true;
    },
    closeBox() {
      this.visible = false;
    },
    async doUpdate() {
      const { oldPwd, newPwd, confirmPassword } = this.updateForm;
      if (!oldPwd) {
        this.$message({
          type: "error",
          message: "旧密码不能为空！",
        });
        return;
      }
      if (!newPwd) {
        this.$message({
          type: "error",
          message: "新密码不能为空！",
        });
        return;
      }
      if (newPwd !== confirmPassword) {
        this.$message({
          type: "error",
          message: "两次输入密码不一致！",
        });
        return;
      }
      if (newPwd.length < 8 || newPwd.length > 16) {
        this.$message({
          type: "error",
          message: "密码长度必须在8-16位之间！",
        });
        return;
      }
      if (passwordLevel(newPwd) < 2) {
        this.$message({
          type: "error",
          message: "密码必须包含字母、数字、特殊字符中的两种！",
        });
        return;
      }
      try {
        this.$store.dispatch("user/upPwd", this.updateForm).then(() => {
          this.$message({ type: "success", message: "密码已修改！" });
          this.visible = false;
        });
      } catch (error) {
        this.$message({ type: "error", message: error.message });
        return false;
      }
    },
  },
};
</script>
