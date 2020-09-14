<template>
  <div style="padding:40px">
    <div class="back">
      <el-button icon="el-icon-arrow-left" size="mini" @click="back"></el-button>
      <strong style="font-size:20px;">创建拼团</strong>
    </div>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="section-title">商品信息</span>
      </div>
      <div class="form-content">
        <el-form :inline="true">
          <div>
            <el-form-item label="关联商品：" required>
              <el-button>+ 添加指定商品</el-button>
              <p class="text-gray">可前往课程详情对课程详情分享信息进行自定义</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="商品原价：" required>
              <span>0.00 元</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
    <div style="height:20px;"></div>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="section-title">拼团信息</span>
      </div>
      <div class="form-content">
        <el-form :inline="true" label-width="120px">
          <div>
            <el-form-item label="拼团活动时间：" required>
              <el-date-picker></el-date-picker>&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;<el-date-picker></el-date-picker>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="拼团人数：" required>
              <div class="form-line">
                <el-input />&nbsp;&nbsp;人
              </div>
              <p class="text-gray">包含团长在内，建议20人</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="拼团时限：" required>
              <el-radio-group>
                <el-radio>24小时</el-radio>
                <el-radio>48小时</el-radio>
              </el-radio-group>
              <p class="text-gray">在此期间如果拼团不成功则自动退款（如果活动剩余时间少于拼团时限以活动剩余时间为准）</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="团员价格：" required>
              <div class="form-line">
                <el-input />&nbsp;&nbsp;元
              </div>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="团长价格：" required>
              <div class="form-line">
                <el-input />&nbsp;&nbsp;元
              </div>
              <p class="text-red">团长价格与团员价格差距过大，会存在“虚假拼团”的风险 </p>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="在线凑团：" required>
              <el-radio-group>
                <el-radio>开启</el-radio>
                <el-radio>关闭</el-radio>
              </el-radio-group>
              <p>开启后，商品详情会显示未成团的团，用户可任意选一个参团，提升团成率</p>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="模拟成团：" required>
              <el-radio-group>
                <el-radio>开启</el-radio>
                <el-radio>关闭</el-radio>
              </el-radio-group>
              <p>开启后，当拼团时限或拼团活动结束前，人数未满的团，系统将会模拟“匿名”买家凑人数，使其成团。 </p>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="超级成员：" required>
              <el-radio-group>
                <el-radio>开启</el-radio>
                <el-radio>关闭</el-radio>
              </el-radio-group>
              <p>开启后拼团人数为最低成团人数。即：如果同时参与某个团的人数超过拼团人数，那么将以实际参团人数成团，避免超员用户支付成功确被迫退款的情况</p>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
.back {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  strong {
    margin-left: 15px;
  }
}
.form-content {
  padding-left: 30px;
  .form-line {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>