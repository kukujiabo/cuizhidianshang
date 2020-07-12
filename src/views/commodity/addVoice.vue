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
      <span>新建音频</span>
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
    }
  }
}
</script>
