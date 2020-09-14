<template>
  <div class="shelf">
    <el-card>
      <div slot="header" class="clearfix">
        <span class="section-title">上架设置</span>
      </div>
      <el-form ref="form" :model="form" required label-width="120px">
        <el-form-item prop="name" label="支持单独售卖：">
          <el-radio-group v-model="form.putMode" class="radius-group">
            <div class="radius-item">
              <el-radio :label="1">立即上架</el-radio>
            </div>
            <div class="radius-item">
              <el-radio :label="2">定时上架</el-radio>
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.readyPutDate"
                type="datetime"
                placeholder="选择日期时间"
              />
            </div>
            <div class="radius-item">
              <el-radio :label="3">暂不上架</el-radio>
            </div>
            <div class="more-options" style="padding-left:20px">
              <div class="radius-item">
                <el-checkbox :disabled="form.putMode === 3" v-model="form.isClose">停售</el-checkbox>
                <span class="radius-tips">上架的商品设置停售后，将停止售卖</span>
              </div> 
              <div class="radius-item">
                <el-checkbox :disabled="form.putMode === 3" v-model="form.isHide">隐藏</el-checkbox>
                <span class="radius-tips">上架的商品设置隐藏后，在店铺内不显示，但可以通过链接访问</span>
              </div>
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
        readyPutDate: '',
        putMode: 1,
        isHide: false,
        isClose: false
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
      this.form.isHide = data.isHide === 1 ? true : false
      this.form.isClose = data.isHide === 1 ? true : false
    }
  }
}
</script>
