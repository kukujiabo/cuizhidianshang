<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账号设置" name="first">
          <div class="form-wrapper">
            <div class="avatar-wrapper">
              <el-upload
                class="avatar-uploader"
                :action="Host + '/api/account/upIcon'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :headers="{
                  Authorization: uploadToken
                }"
              >
                <img v-if="getUserIcon" :src="getUserIcon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
            <el-form ref="form" :model="form">
              <el-form-item label="账号">
                <el-input readonly :value="getUserCode" />
                <a class="modify" href="javascript:void(0)" @click="showUpdateAccount">修改账号</a>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input readonly :value="getUserName" />
                <a class="modify" href="javascript:void(0)" @click="showUpdateName">修改姓名</a>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input readonly :value="getPhone" />
                <a class="modify" href="javascript:void(0)" @click="showUpdatePhoneBox">更换手机号</a>
              </el-form-item>
              <el-form-item label="密码">
                <el-input readonly v-model="form.password" type="password" />
                <a class="modify" href="javascript:void(0)" @click="showUpdatePasswordBox">更换密码</a>
              </el-form-item>
              <el-form-item label="绑定微信">
                <el-input readonly v-model="getWxNo" />
                <a class="modify" href="javascript:void(0)" @click="showUpdateWechat">更换绑定微信</a>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="当前版本" name="second">
          <div class="version-wrapper">
            <div class="info-item">
              <div class="info-label">版本信息：</div>
              <div class="info-content">高级版</div>
            </div>
            <div class="info-item">
              <div class="info-label">版本状态：</div>
              <div class="info-content">使用中</div>
            </div>
            <div class="info-item">
              <div class="info-label">付款类型：</div>
              <div class="info-content">已付费</div>
            </div>
            <div class="info-item">
              <div class="info-label">创建信息：</div>
              <div class="info-content">2019.10.10: 13:30:08</div>
            </div>
            <div class="info-item">
              <div class="info-label">到期时间：</div>
              <div class="info-content">2019.10.10: 13:30:08</div>
            </div>
            <div class="operation">
              <el-button type="primary">升级版本</el-button>
              <el-button type="default">订单记录</el-button>
              <el-button type="default">申请开票</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <update-phone-box ref="updatePhoneBox" />
    <update-password ref="updatePasswordBox" />
    <update-wechat ref="updateWechatBox" />
    <update-account ref="updateAccount" />
    <update-name ref="updateName" />
  </div>
</template>

<style lang='scss'>
@import '~@/styles/index.scss';

.app-container {
  .version-wrapper {
    padding: 30px 15px;
    width: 600px;
    .operation {
      margin-top: 50px;
      button {
        margin-right: 30px;
      }
    }
    .info-item {
      @extend .flex;
      @extend .flex-row;
      height: 60px;
      line-height: 60px;
      .info-label {
        font-weight: 800;
        color: $textGray;
      }
      .info-content {
      }
    }
  }
  .form-wrapper {
    padding: 35px 15px;
    width: 600px;
    .el-form {
      .el-form-item {
        @extend .flex;
        @extend .flex-column;
        .el-form-item__label {
          text-align: left;
        }
        .el-form-item__content {
          display: block;
          .modify {
            margin-left: 10px;
            font-size: 13px;
            color: $themeBlue;
          }
          .el-input {
            display: inline;
            .el-input__inner {
              border: 0;
              width: 400px;
              height: 40px;
              margin-top: 5px;
              line-height: 40px;
              border-radius: 8px;
              background-color: $lightBackground;
            }
          }
        }
      }
    }
    .avatar-wrapper {
      margin-bottom: 35px;
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        border-radius: 80px;
        background-color: $lightBackground;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border-radius: 80px;
      }
      .avatar {
        width: 80px;
        height: 80px;
        display: block;
        border-radius: 80px;
      }
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import UpdatePhoneBox from '@/components/UpdatePhone'
import UpdatePassword from '@/components/UpdatePassword'
import UpdateWechat from './components/UpdateWechat'
import UpdateAccount from './components/UpdateAccount'
import UpdateName from './components/UpdateName'
import { getToken, getTokenType } from '@/utils/auth'
import { Host } from '@/config'


export default {
  name: 'Profile',
  components: {
    UpdateName,
    UpdateWechat,
    UpdatePhoneBox,
    UpdatePassword,
    UpdateAccount
  },
  computed: {
    ...mapGetters(['getPhone', 'getUserName', 'getUserCode', 'getUserIcon', 'getWxNo'])
  },
  data() {
    const token = getTokenType() + ' ' + getToken()
    return {
      user: {},
      Host,
      uploadToken: token,
      activeName: 'first',
      activeTab: 'activity',
      form: {
        Icon: '',
        account: '',
        name: '',
        password: '***********',
        phone: '',
        wechat: ''
      }
    }
  },
  created() {

  },
  methods: {
    handleClick() {

    },
    showUpdatePhoneBox() {
      this.$refs.updatePhoneBox.show()
    },
    showUpdatePasswordBox() {
      this.$refs.updatePasswordBox.show()
    },
    showUpdateWechat() {
      this.$refs.updateWechatBox.show()
    },
    handleAvatarSuccess({ success, data }) {
      this.$store.dispatch('user/getInfo')
    },
    showUpdateAccount() {
      this.$refs.updateAccount.show()
    },
    showUpdateName() {
      this.$refs.updateName.show()
    }
  }
}
</script>
