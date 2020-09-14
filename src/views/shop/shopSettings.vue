<template>
  <div class="setting-container">
    <div class="divider">
      <el-card>
        <div slot="header" class="clearfix">
          <span class="section-title">店铺信息</span>
        </div>
        <div>
          <el-form
            ref="shopForm"
            class="shop-form"
            :model="shopForm"
            :inline="true"
            label-width="120px"
          >
            <div>
              <el-form-item prop="shop_name" label="店铺名称：">
                <el-input v-model="shopInfo.name" placeholder="请输入店铺名称" readonly />
                <el-button type="text" @click="editShopName">修改</el-button>
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="shop_link" label="店铺连接地址：">
                <el-input v-model="shopLink" placeholder="请输入店铺连接" />
                <el-button type="text" @click="handleClipLink">复制链接</el-button>
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="shop_appid" label="店铺appid：">
                <el-input v-model="shopInfo.appId" placeholder="请输入店铺appid" />
                <el-button type="text" @click="handleClipAppId">复制</el-button>
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="shop_authentication" label="店铺认证：">
                <el-input v-model="shopForm.shop_authentication" />
                <el-button type="text" @click="gotoMenu">查看认证</el-button>
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="business_type" label="店铺类型：">
                <el-radio-group v-model="shopInfo.busType" name="business_type">
                  <el-radio :label="1">装饰公司</el-radio>
                  <el-radio :label="2">代理商</el-radio>
                  <el-radio :label="3">品牌厂商</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="divider">
      <el-card title="品牌信息">
        <div slot="header" class="clearfix">
          <span class="section-title">品牌信息</span>
        </div>
        <div>
          <el-form class="shop-form" :model="brandForm" label-width="120px">
            <el-form-item prop="shop_logo" label="店铺LOGO：">
              <div class="shop-info-image">
                <div class="shop-image">
                  <img v-if="shopInfo.logoSrc" :src="Host + '/res/' + shopInfo.logoSrc">
                  <img v-else src="@/assets/emptyqrcode.jpg">
                </div>
                <div>
                  <el-upload
                    class="upload-demo"
                    name="logo"
                    :show-file-list="false"
                    :action=" Host + '/api/shop/upLogo' "
                    :limit="1"
                    :data="logoData"
                    :headers="{
                      Authorization: token,
                      appid: shopInfo.id
                    }"
                    :on-success="avatarUploaded"
                  >
                    <el-button type="text">修改</el-button>
                  </el-upload>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="shop_logo" label="店铺分享语：">
              <div class="shop-info-image">
                <div class="shop-image">
                  <img v-if="shopInfo.shareLogoSrc" :src="Host + '/res/' + shopInfo.shareLogoSrc">
                  <img v-else src="@/assets/emptyqrcode.jpg">
                  <div class="info">
                    <span class="title">{{ shopInfo.shareTitle }}</span>
                    <span class="tips">{{ shopInfo.shareRemark }}</span>
                  </div>
                </div>
                <div>
                  <el-button type="text" @click="showShopShare = true">修改</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="  shop_logo" label="直播间公告：">
              <div class="shop-info-image">
                <div class="shop-image">
                  <img v-if="brandForm.shop_logo" :src="brandForm.shop_logo">
                  <img v-else src="@/assets/emptyqrcode.jpg">
                  <div class="info">
                    <span class="title">张向东</span>
                    <span class="tips">欢迎进入直播间：1、进入直播间请注意语言用词…</span>
                  </div>
                </div>
                <div>
                  <el-upload
                    class="upload-demo"
                    action="http://eccs.com.cn/services/"
                    multiple
                    :limit="1"
                  >
                    <el-button type="text">修改</el-button>
                  </el-upload>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="divider">
      <el-card title="消息推送">
        <div slot="header" class="clearfix">
          <span class="section-title">消息推送</span>
        </div>
        <div class="message-container">
          <div>
            <el-row :gutter="20">
              <el-col :xl="4" :lg="5" :md="8">
                <el-card>
                  <div class="card-info">
                    <div class="info">
                      <span class="title">信息采集</span>
                      <span class="tips">通知范围包含：手机验证码通知</span>
                    </div>
                    <div class="switch">
                      <el-switch v-model="messageForm.getterMessage1" />
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :xl="4" :lg="5" :md="8">
                <el-card>
                  <div class="card-info">
                    <div class="info">
                      <span class="title">活动管理</span>
                      <span class="tips">通知范围包含：手机验证码通知</span>
                    </div>
                    <div class="switch">
                      <el-switch v-model="messageForm.activityMessage" />
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :xl="4" :lg="5" :md="8">
                <el-card>
                  <div class="card-info">
                    <div class="info">
                      <span class="title">信息采集</span>
                      <span class="tips">通知范围包含：直播通知提</span>
                    </div>
                    <div class="switch">
                      <el-switch v-model="messageForm.getterMessage2" />
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog width="600px" title="设置店铺分享" :visible.sync="showShopShare">
      <div class="share-content">
        <el-form ref="shareUpdateForm" :inline="true">
          <div>
            <el-form-item prop="shareLogo" label="分享图标">
              <el-upload
                ref="uploadShareImage"
                class="avatar-uploader"
                action="http://eccs.com.cn/services/"
                :on-success="shareUpdateHandler"
                :auto-upload="false"
                :on-change="changeShareImage"
              >
                <img v-if="shareForm.shareLogoSrc" :src="shareForm.shareLogoSrc" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="shareTitle" label="分享标题">
              <el-input v-model="shareForm.shareTitle" placeholder="请输入分享标题" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="shareRemark" label="分享描述">
              <el-input v-model="shareForm.shareRemark" placeholder="请输入分享描述" />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="share-submit">
        <el-button @click="cancelShareUpdate">取消</el-button>
        <el-button type="primary" @click="confirmShareUpdate">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Host } from '@/config'
import { getToken, getTokenType } from '@/utils/auth'
import { editName, getCertify } from '@/api/shop'
import clipboard from '@/utils/clipboard'

export default {
  props: {
    shopInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const shareForm = {
      shareLogoSrc: this.shopInfo.shareLogoSrc
        ? Host + '/res/' + this.shopInfo.shareLogoSrc
        : '',
      shareLogo: null,
      shareTitle: this.shopInfo.shareTitle,
      shareRemark: this.shopInfo.shareRemark
    }
    return {
      shopLink: 'https://eccs.com.cn/s/#/?AppId=' + this.shopInfo.url,
      showShopSetting: false,
      showShopShare: false,
      token: getTokenType() + ' ' + getToken(),
      Host: Host,
      logoData: {
        shopId: this.shopInfo.id
      },
      shareForm: shareForm,
      shopForm: {
        shop_name: '',
        shop_link: '',
        shop_appid: '',
        business_type: 1,
        shop_authentication: ''
      },
      brandForm: {
        shop_logo: ''
      },
      messageForm: {
        getterMessage1: false,
        activityMessage: false,
        getterMessage2: false
      }
    }
  },
  created() {
    console.log(this.shopInfo, 'created----')
    this.$bus.$on('shopinfosync', _ => {
      console.log(123)
      console.log(this.shopInfo, 'shopinfo------')
    })
  },
  mounted() {
    // this.getCertify1();
  },
  methods: {
    async getCertify1() {
      const data = await getCertify(this.shopInfo.id)
      if ((data.data.success = true)) {
        console.log(data.data)
        if (data.data.certifyType === 1) {
          this.shopForm.shop_authentication = data.data.userName
        }
        if (data.data.certifyType === 2) {
          this.shopForm.shop_authentication = data.data.organizationName
        }
        if (data.data.certifyType === 3) {
          this.shopForm.shop_authentication = data.data.organizationName
        }
      }
    },
    handleClipLink(evt) {
      clipboard(this.shopLink, event)
    },
    handleClipAppId(evt) {
      clipboard(this.shopInfo.appId, event)
    },
    avatarUploaded({ success }) {
      if (success) {
        this.$emit('refreshshop')
      }
    },
    editShopName() {
      this.$prompt('请输入店铺名称', '修改店铺名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        if (!value) {
          this.$message({ type: 'error', message: '必须输入名称！' })
          return
        }
        try {
          const { success, message } = await editName({
            shopId: this.shopInfo.id,
            name: value
          })
          console.log(success)
          if (success) {
            this.$message({ type: 'success', message: '修改成功！' })
            this.$emit('refreshshop')
          } else {
            this.$message({ type: 'error', message })
          }
        } catch (error) {
          this.$message({ type: 'error', message: '修改失败，请联系管理员！' })
        }
      })
    },
    shareUpdateHandler() {},
    cancelShareUpdate() {
      this.$refs.shareUpdateForm.resetFields()
      this.showShopShare = false
    },
    confirmShareUpdate() {
      if (!this.shareForm.shareTitle) {
        this.$message({ type: 'error', message: '分享标题必须填写' })
        return
      }
      if (!this.shareForm.shareRemark) {
        this.$message({ type: 'error', message: '分享描述必须填写' })
        return
      }
      const xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', 'http://eccs.com.cn/services/api/shop/upShare')
      xhr.setRequestHeader('Authorization', getTokenType() + ' ' + getToken())
      xhr.onload = () => {
        this.loading = false
        if (xhr.status !== 200) {
          return
        }
        const { success, message } = JSON.parse(xhr.responseText)
        if (success) {
          this.$message({ type: 'success', message: '修改成功！' })
          this.showShopShare = false
          this.$emit('refreshshop')
        } else {
          this.$message({ type: 'error', message })
        }
      }
      const shareForm = new FormData()

      // 基本信息
      if (this.shareForm.shareLogo) {
        shareForm.append(
          'shareLogo',
          this.shareForm.shareLogo,
          this.shareForm.shareLogo.filename
        )
      }
      shareForm.append('shareTitle', this.shareForm.shareTitle)
      shareForm.append('shareRemark', this.shareForm.shareRemark)
      shareForm.append('shopId', this.shopInfo.id)
      xhr.send(shareForm)
    },
    changeShareImage(file) {
      this.shareForm.shareLogo = file.raw
      this.shareForm.shareLogoSrc = URL.createObjectURL(file.raw)
    },
    gotoMenu() {
      this.id = this.shopInfo.id
      this.name = this.shopInfo.name
      this.$router.push('/attestation?id=' + this.id + '&name=' + this.name)
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";

.setting-container {
  background-color: #f3f5f7;
  position: absolute;
  padding: 40px;
  height: 100%;
  left: 110px;
  right: 0;
  overflow: scroll;
  .share-content {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .share-submit {
    height: 72px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .divider {
    margin-bottom: 40px;
    .message-container {
      .card-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .info {
          display: flex;
          flex-direction: column;
          .title {
            line-height: 28px;
            font-size: 14px;
          }
          .tips {
            line-height: 16px;
            font-size: 11px;
            color: #a1a1a1;
          }
        }
      }
    }
    .section-title {
      font-size: 16px;
      font-weight: 900;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 10px;
      margin-right: 10px;
      background-color: $themeBlue;
      @include radius(2px);
    }
    .shop-form {
      .el-form-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        .el-form-item__content {
          width: 600px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          margin-left: 0 !important;
          .el-input {
            width: 380px;
            .el-input__inner {
              width: 360px;
              background-color: #f3f5f7;
            }
          }
        }
        .shop-info-image {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 400px;
          .shop-image {
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
              width: 54px;
              height: 54px;
              border-radius: 6px;
              background-color: #f3f5f7;
            }
            .info {
              display: flex;
              padding-left: 15px;
              flex-direction: column;
              .title {
                font-size: 14px;
                line-height: 26px;
              }
              .tips {
                line-height: 20px;
                font-size: 12px;
                color: #a1a1a1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
