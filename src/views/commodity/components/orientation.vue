<template>
  <div class="shelf">
    <el-card>
      <div slot="header" class="clearfix">
        <span class="section-title">直播模式</span>
      </div>
      <el-form ref="form" :model="form" required label-width="120px">
        <el-form-item prop="name" label="支持单独售卖：">
          <el-radio-group v-model="form.playMode" class="radius-group">
            <div class="radius-item">
              <el-radio :label="1">横屏直播</el-radio>
              <span class="radius-tips">适用于需要演示课件的知识讲解类直播</span>
            </div> 
            <div class="radius-item">
              <el-radio :label="2">竖屏直播</el-radio>
              <span class="radius-tips">适用于泛娱乐教学、营销带货类直播</span>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss">
@import "~@/styles/index.scss";

.shelf {
  .section-title::before {
    content: "";
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
      height: 45px;
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
        playMode: 1
      }
    }
  },
  methods: {
    getFormData() {
      return this.form
    },
    setData(data) {
      this.form.readyPutDate = data.readyPutDate
      this.form.putMode = data.putMode
    }
  }
}
</script>
