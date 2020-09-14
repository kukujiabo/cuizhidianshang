<template>
  <div class="scontainer">
    <div class="sec-title" @click="$router.back()">
      <el-button
        type="primary"
        plain
        class="section-back"
        icon="el-icon-arrow-left"
        @click="goBack"
      />
      <span>返回上一页</span>
    </div>
    <profile-setting />
  </div>
</template>
<style lang="scss">
@import '~@/styles/index.scss';
.scontainer {
  padding: 30px 0;
  .sec-title {
    font-size: 20px;
    font-weight: 800;
    height: 72px;
    line-height: 72px;
    padding-left: 20px;
    width: 200px;
    cursor: pointer;
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
}
</style>
<script>
import ProfileSetting from '@/views/profile/index'

export default {
  components: {
    ProfileSetting
  },
  data() {
    return {

    }
  }
}
</script>
