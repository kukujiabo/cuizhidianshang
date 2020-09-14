<template>
  <div class="operate">
    <el-card title>
      <div slot="header" class="clearfix">
        <span class="section-title">引导加群</span>
      </div>
      <div class="inner-form-wrapper">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item required prop="joinGroup" label="引导加群：">
            <el-switch
              v-model="form.joinGroup"
            />
            <span class="tips">引导用户加微信群、微信个人号或公众号等。</span>
            <a href="javascript:void(0)" class="text-blue">查看教程</a>
          </el-form-item>
          <el-form-item prop="joinGroupOfPage" required label="引导方式：">
            <el-checkbox :disabled="!form.joinGroup" v-model="form.joinGroupOfPage">详情页引导加群</el-checkbox>
            <a href="javascript:void(0)" class="text-blue">查看示例</a>
          </el-form-item>
          <el-form-item prop="joinGroupOfPageTitle">
            <div class="inner-line-input">
              <span class="inner-line-label" style="padding-left:25px">前端显示标题</span>
              <el-input :disabled="!form.joinGroup" v-model="form.joinGroupOfPageTitle" style="width:220px;" placeholder="请输入要显示的标题" maxlength="16" show-word-limit />
            </div>
          </el-form-item>
          <el-form-item prop="joinGroupOfBuy">
            <el-checkbox :disabled="!form.joinGroup" v-model="form.joinGroupOfBuy">购买成功页引导加群</el-checkbox>
            <span style="margin-left:10px;">店铺设置</span>
            <a href="javascript:void(0)" class="text-blue">购买后引导关注设置</a>
            <span>的内容将被替换</span>
          </el-form-item>
          <el-form-item required prop="qrTitle" label="内容设置：">
            <div class="inner-line-input">
              <span class="inner-line-label" style="width:100px;">二维码标题</span>
              <el-input :disabled="!form.joinGroup" v-model="form.qrTitle" style="width:400px;" placeholder="可输入群名称" maxlength="30" show-word-limit />
            </div>
          </el-form-item>
          <el-form-item prop="qrRemark" label=" ">
            <div class="inner-line-input">
              <span class="inner-line-label" style="width:100px;">二维码描述</span>
              <el-input :disabled="!form.joinGroup" v-model="form.qrRemark" style="width:400px;" placeholder="可输入相关引导文案" maxlength="40" show-word-limit />
            </div>
          </el-form-item>
          <el-form-item label=" ">
            <div class="inline-upload">
              <div class="label">
                <span>二维码上传</span>
              </div>
              <div class="uploader">
                <img v-if="form.qrcodeUrl" class="uploader-img" :src="form.qrcodeUrl">
                <img v-else class="uploader-img" src="@/assets/emptyqrcode.jpg">
                <!-- <el-button type="info" style="width:82px;" plain>上传</el-button>
                <p class="text-gray">建议上传图片格式1:1，JPG、PNG格</p> -->
                <el-upload
                  class="upload-demo"
                  multiple
                  :disabled="!form.joinGroup"
                  :limit="1"
                  :action="Host"
                  :file-list="fileList"
                  :auto-upload="false"
                  :on-change="changeFile"
                >
                  <el-button :disabled="!form.joinGroup" type="info" style="width:82px;" plain>上传</el-button>
                  <div slot="tip" class="el-upload__tip">建议上传图片格式1:1，JPG、PNG格</div>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item label=" ">
            <p style="font-size:18px;font-weight:800">温馨提示</p>
            <p class="text-gray">微信群人数超过100人后将无法扫码进群且微信群二维码有效期为7天，请及时更新新群二维码</p>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.operate {
  .section-title::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 10px;
    margin-right: 10px;
    background-color: $themeBlue;
    @include radius(2px);
  }
  .inner-form-wrapper {
    .tips {
      margin-left: 10px;
      font-size: $textGray;
    }
    .inner-line-input {
      display: flex;
      flex-direction: row;
      .inner-line-label {
        width: 140px;
      }
    }
    .inline-upload {
      display: flex;
      flex-direction: row;
      .label {
        width: 100px;
      }
      .uploader {
        display: flex;
        flex-direction: column;
        .uploader-img {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
          background-color: $lightBackground;
        }
      }
    }
  }
  .btns {
    padding: 50px 100px;
    .el-button {
      width: 120px;
      height: 40px;
      line-height: 20px;
      margin: 0 20px;
    }
  }
}
</style>

<script>
import { Host } from '@/config'
export default {
  data() {
    return {
      Host,
      fileList: [],
      form: {
        joinGroup: false,
        joinGroupOfPage: false,
        joinGroupOfBuy: false,
        joinGroupOfPageTitle: '',
        qrTitle: '',
        qrRemark: '',
        rawQrcode: null,
        qrcodeUrl: ''
      }
    }
  },
  methods: {
    changeFile(file) {
      this.form.rawQrcode = file.raw
      this.form.qrcodeUrl = URL.createObjectURL(file.raw)
    },
    getFormData() {
      return this.form
    },
    setData(data) {
      this.form.joinGroup = data.joinGroup === 1 ? true : false
      this.form.joinGroupOfPage = data.joinGroupOfPage
      this.form.joinGroupOfBuy = data.joinGroupOfPage
      this.form.joinGroupOfPageTitle = data.joinGroupOfPageTitle
      this.form.qrTitle = data.qrTitle
      this.form.qrRemark = data.qrRemark
      this.form.qrcodeUrl = data.qrcodeUrl
    }
  }
}
</script>
