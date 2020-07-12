<template>
  <div class="app-container">
    <div class="sec-title">
      <el-button
        type="primary"
        plain
        class="section-back"
        icon="el-icon-arrow-left"
        @click="goBack"
      />
      <span>新建视频</span>
    </div>
    <video-basic ref="videoBasic" />
    <div class="form-section-divider" />
    <goods-info ref="goodsInfo" />
    <div class="form-section-divider" />
    <on-shelf ref="onSelf" />
    <div class="form-section-divider" />
    <business-operate ref="businessOperation" />
    <div class="btns">
      <el-button type="primary" plain>取消</el-button>
      <el-button v-loading="loading" type="primary" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<style lang="scss">
@import '~@/styles/index.scss';
.app-container {
  .sec-title {
    height: 72px;
    font-size: 20px;
    font-weight: 800;
    line-height: 72px;
    .section-back {
      height: 24px;
      width: 24px;
      padding: 0;
      box-sizing: border-box;
      line-height: 24px;
      margin-right: 10px;
      font-weight: 800;
      border: 1px solid $themeBlue;
      color: $themeBlue;
    }
  }
  .form-section-divider {
    height: 30px;
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
import VideoBasic from './components/videoBasicInfo'
import GoodsInfo from './components/goodsInfo'
import BusinessOperate from './components/businessOperate'
import OnShelf from './components/onShelf'
import { getToken, getTokenType } from '@/utils/auth'

export default {
  components: {
    BusinessOperate,
    VideoBasic,
    GoodsInfo,
    OnShelf
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    submit() {
      const videoBasicInfo = this.$refs.videoBasic.getFormData()
      const goodsInfo = this.$refs.goodsInfo.getFormData()
      const selfInfo = this.$refs.onSelf.getFormData()
      const binfo = this.$refs.businessOperation.getFormData()
      const formData = { ...videoBasicInfo, ...goodsInfo, ...selfInfo, ...binfo }
      if (!formData.title) {
        this.$message({
          type: 'error',
          message: '视频名称必须填写'
        })
        return
      }
      if (!formData.introduc) {
        this.$message({
          type: 'error',
          message: '视频简介必须填写'
        })
        return
      }
      if (!formData.coverUrl) {
        this.$message({
          type: 'error',
          message: '视频封面必须上传'
        })
        return
      }
      if (!formData.frontCoverUrl) {
        this.$message({
          type: 'error',
          message: '视频贴图必须上传'
        })
        return
      }
      if (formData.sellMode === 1) {
        if (!formData.stdUnitPrice) {
          this.$message({ type: 'error', message: '原价必须填写' })
          return
        }
        if (!formData.realUnitPrice) {
          this.$message({ type: 'error', message: '现价必须填写' })
          return
        }
      }
      if (formData.qrTitle) {
        if (!formData.rawQrcode) {
          this.$message({ type: 'error', message: '二维码图片必须上传' })
          return
        }
      }
      const xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', 'http://49.234.156.48:8083/api/goods/addVideo')
      xhr.setRequestHeader('Authorization', getTokenType() + ' ' + getToken())
      xhr.onload = () => {
        this.loading = false
        if (xhr.status !== 200) {
          return
        }
        const { success, message } = JSON.parse(xhr.responseText)
        if (success) {
          this.$message({ type: 'success', message: '添加成功！' })
          setTimeout(_ => {
            this.$router.back()
          }, 1000)
        } else {
          this.$message({ type: 'error', message: message })
        }
      }
      const goodsForm = new FormData()

      // 基本信息
      goodsForm.append('title', formData.title)
      goodsForm.append('videoFile', formData.videoFile)
      goodsForm.append('cover', formData.cover, formData.cover.filename)
      goodsForm.append('frontCover', formData.frontCover, formData.frontCover.filename)
      goodsForm.append('content', formData.content)
      goodsForm.append('allowCopy', formData.allowCopy)

      // 商品信息
      goodsForm.append('clsId', formData.clsId) // 分组
      goodsForm.append('singleSell', formData.singleSell) // 单独售卖
      goodsForm.append('sellMode', formData.sellMode) // 售卖方式：1.付费，0.免费
      goodsForm.append('stdUnitPrice', formData.stdUnitPrice) // 原价
      goodsForm.append('realUnitPrice', formData.realUnitPrice) // 现价

      // 上架信息
      goodsForm.append('putMode', formData.putMode)
      goodsForm.append('readyPutDate', formData.readyPutDate)

      // 引导加群
      goodsForm.append('joinGroup', formData.joinGroup ? 1 : 0) // 引导加群
      goodsForm.append('joinGroupOfPage', formData.joinGroupOfPage ? 1 : 0) // 引导方式：详情页
      goodsForm.append('joinGroupOfPageTitle', formData.joinGroupOfPageTitle) // 前端标题
      goodsForm.append('joinGroupOfBuy', formData.joinGroupOfBuy ? 1 : 0) // 购买成功引导加群
      goodsForm.append('qrTitle', formData.qrTitle) // 二维码标题
      goodsForm.append('qrRemark', formData.qrRemark) // 二维码描述
      goodsForm.append('qrImage', formData.rawQrcode, formData.rawQrcode.filename)
      xhr.send(goodsForm)
    }
  }
}
</script>
