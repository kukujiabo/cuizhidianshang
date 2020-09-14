<template>
  <div class="pd40 marketing-container">
    <el-card style="height:100%" show-shadow="never">
      <div style="padding: 0 30px">
        <h4>营销管理</h4>
        <el-row>
          <el-col :span="4">
            <el-card>
              <div class="marketing-option" @click="toPage(1)">
                <img class="marketing-logo" src="@/assets/m-daren.png">
                <h4>达人榜</h4>
                <p class="marketing-tips">有偿激励推广</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-card>
              <div class="marketing-option" @click="toPage(2)">
                <img class="marketing-logo" src="@/assets/m-invite.png">
                <h4>邀请码</h4>
                <p class="marketing-tips">赠送免费体验权益</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-card>
              <div class="marketing-option" @click="toPage(3)">
                <img class="marketing-logo" src="@/assets/m-youhuiquan.png">
                <h4>优惠券</h4>
                <p class="marketing-tips">领券购物更划算</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-card>
              <div class="marketing-option" @click="toPage(4)">
                <img class="marketing-logo" src="@/assets/m-pintuan.png">
                <h4>拼团</h4>
                <p class="marketing-tips">有偿激励推广</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-card>
              <div class="marketing-option" @click="toPage(5)">
                <img class="marketing-logo" src="@/assets/m-liebian.png">
                <h4>裂变</h4>
                <p class="marketing-tips">裂变分享快速引流</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<style lang="scss">
.marketing-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .marketing-option:hover {
    transform: scale(1.1);
  }
  .marketing-option {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    cursor: pointer;
    .marketing-logo {
      width: 70px;
      height: 70px;
      border-radius: 35px;
      background-color: #f3f5f7;
    }
    .marketing-tips {
      margin: 0;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    toPage(index) {
      switch (index) {
        case 1:
          this.$router.push({ path: '/marketing/promotionStaff' })
          break
        case 2:
          this.$router.push({ path: '/marketing/inviteCode' })
          break
        case 3:
          this.$router.push({ path: '/marketing/coupon' })
          break
        case 4:
          this.$router.push({ path: '/marketing/groupBuying' })
          break
        case 5:
          this.$router.push({ path: '/marketing/fission' })
          break
      }
    }
  }
}
</script>
