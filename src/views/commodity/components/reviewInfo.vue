<template>
  <div class="review-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span class="section-title">直播回放设置</span>
      </div>
      <div class="inner-form-wrapper">
        <el-form :model="form" label-width="118px">
          <el-form-item label="回放设置：">
            <el-radio-group v-model="form.eachPlay" class="radius-group">
              <div class="radius-item">
                <el-radio :label="1">开启</el-radio> <span class="radius-tips">开启回放，直播结束后直播间将播放回放视频</span>
              </div>
              <div class="radius-item">
                <el-radio :label="0">关闭</el-radio> <span class="radius-tips">关闭回放，直播结束后不播放回放视频</span>
              </div>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";
.review-container {
  .section-title::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 10px;
    margin-right: 10px;
    background-color: $themeBlue;
    @include radius(2px);
  }
  .radius-group {
    width: 500px;
    .radius-item {
      display: block;
      height: 39px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .el-radio {
        .el-radio__label {
          color: $textGray;
        }
      }
      .radius-tips {
        font-size: 10px;
        color: #b1b1b1;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        eachPlay: 1
      }
    }
  },
  methods: {
    getFormData() {
      return this.form
    }
  }
}
</script>
