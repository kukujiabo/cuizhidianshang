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
      <span>{{ id ? '编辑视频' : '新建视频' }}</span>
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
      <el-button  :disabled="loading" v-loading="loading" type="primary" @click="submit">保存</el-button>
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
import Cookies from 'js-cookie'
import { getToken, getTokenType } from '@/utils/auth'
import { getDocumentDetail } from '@/api/document'
import { Host } from '@/config'

export default {
  components: {
    BusinessOperate,
    VideoBasic,
    GoodsInfo,
    OnShelf
  },
  data() {
    return {
      id: '',
      loading: false
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getDetail()
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async getDetail() {
      try {
        const { data } = await getDocumentDetail(this.id)
        const basicInitData = {
          title: data.title,
          coverUrl: Host + '/res/' + data.cover,
          content: data.content,
          frontCoverUrl: Host + '/res/' + data.frontCover,
          allowCopy: data.allowCopy
        }
        this.$refs.videoBasic.setData(basicInitData)
        const infoInitData = {
          clsId: data.clsId,
          singleSell: data.singleSell,
          sellMode: data.sellMode,
          stdUnitPrice: data.stdUnitPrice,
          realUnitPrice: data.realUnitPrice
        }
        this.$refs.goodsInfo.setData(infoInitData)
        const shelfData = {
          readyPutDate: data.readyPutDate,
          putMode: data.putMode
        }
        this.$refs.onSelf.setData(shelfData)
        const busData = {
          joinGroup: data.joinGroup,
          joinGroupOfPage: data.joinGroupOfPage,
          joinGroupOfBuy: data.joinGroupOfBuy,
          joinGroupOfPageTitle: data.joinGroupOfPageTitle,
          qrTitle: data.qrTitle,
          qrRemark: data.qrRemark,
          qrcodeUrl: Host + '/res/' + data.qrImage
        }
        this.$refs.businessOperation.setData(busData)
      } catch (error) {
        console.log(error)
      }
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
      if (!formData.content) {
        this.$message({
          type: 'error',
          message: '视频详情必须填写'
        })
        return
      }
      if (!this.id && !formData.coverUrl) {
        this.$message({
          type: 'error',
          message: '视频封面必须上传'
        })
        return
      }
      if (!this.id && !formData.frontCoverUrl) {
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
      
      const api = Host + '/api/goods/' + (this.id ? 'upVideo' : 'addVideo')
      const xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', api)
      xhr.setRequestHeader('Authorization', getTokenType() + ' ' + getToken())
      xhr.setRequestHeader('appid', Cookies.get('appid'))
      xhr.onload = () => {
        if (xhr.status !== 200) {
          return
        }
        const { success, message } = JSON.parse(xhr.responseText)
        if (success) {
          if (!this.id) {
            this.$message({ type: 'success', message: '添加成功！' })
          } else {
            this.$message({ type: 'success', message: '编辑成功！' })
          }
          setTimeout(_ => {
            this.loading = false
            this.$router.back()
          }, 800)
        } else {
          this.loading = false
          this.$message({ type: 'error', message: message })
        }
      }
      const goodsForm = new FormData()

      // 基本信息
      goodsForm.append('title', formData.title)
      if (formData.videoFile) {
        goodsForm.append('videoFile', formData.videoFile)
      }
      if (formData.cover) {
        goodsForm.append('cover', formData.cover, formData.cover.filename)
      }
      if (formData.frontCover) {
        goodsForm.append('frontCover', formData.frontCover, formData.frontCover.filename)
      }
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
      goodsForm.append('isHide', formData.isHide ? 1: 0)
      goodsForm.append('isClose', formData.isClose ? 1 : 0)
      goodsForm.append('readyPutDate', formData.readyPutDate)

      // 引导加群
      goodsForm.append('joinGroup', formData.joinGroup ? 1 : 0) // 引导加群
      if (formData.joinGroup) {
        goodsForm.append('joinGroupOfPage', formData.joinGroupOfPage ? 1 : 0) // 引导方式：详情页
        goodsForm.append('joinGroupOfPageTitle', formData.joinGroupOfPageTitle) // 前端标题
        goodsForm.append('joinGroupOfBuy', formData.joinGroupOfBuy ? 1 : 0) // 购买成功引导加群
        goodsForm.append('qrTitle', formData.qrTitle) // 二维码标题
        goodsForm.append('qrRemark', formData.qrRemark) // 二维码描述
        goodsForm.append('qrImage', formData.rawQrcode, formData.rawQrcode.filename)
      }
      if (this.id) {
        goodsForm.append('id', this.id)
      }
      this.loading = true
      xhr.send(goodsForm)
    }
  }
}
</script>
