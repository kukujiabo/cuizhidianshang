<template>
  <div style="padding:30px">
    <div class="sec-title">
      <el-button
        type="primary"
        plain
        class="section-back"
        icon="el-icon-arrow-left"
        @click="goback"
      />
    </div>
    <div class="page-container">
      <div class="clearfix">
        <span class="section-title">基本信息</span>
      </div>
      <div class="basic-info">
        <div class="info">
          <div class="label">
            <span>账号</span>
          </div>
          <div class="content">
            <span>{{cruinfo.userCode}}</span>
          </div>
        </div>
        <div class="info">
          <div class="label">
            <span>姓名</span>
          </div>
          <div class="content">
            <span>{{cruinfo.userName}}</span>
          </div>
        </div>
        <div class="info">
          <div class="label">
            <span>手机号</span>
          </div>
          <div class="content">
            <span>{{cruinfo.phone}}</span>
          </div>
        </div>
        <div class="info">
          <div class="label">
            <span>头像</span>
          </div>
          <div class="content">
            <img :src="Host + '/res/' + cruinfo.icon" class="head" />
          </div>
        </div>
        <div class="info">
          <div class="label">
            <span>员工描述</span>
          </div>
          <div class="content">
            <span>{{cruinfo.describe}}</span>
          </div>
        </div>
      </div>
      <div class="clearfix">
        <span class="section-title">角色权限</span>
      </div>
      <div class="role-auth">
        <el-tree :default-expand-all="true" :props="defaultProps" :data="permission" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "~@/styles/index.scss";
.sec-title {
  font-size: 20px;
  font-weight: 800;
  height: 72px;
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
.page-container {
  padding: 30px;
  background-color: #fff;
  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 72px;
    width: 360px;
    .label {
      width: 160px;
    }
    .content {
      color: #666;
    }
    .head {
      width: 50px;
      height: 50px;
    }
  }
  .basic-info {
    border-bottom: 1px solid #ccc;
    padding: 30px 0;
    margin-bottom: 40px;
  }
  .role-auth {
    padding: 30px 0;
  }
  .section-title::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 10px;
    margin-right: 10px;
    background-color: $themeBlue;
    @include radius(2px);
  }
  .section-title {
    font-size: 18px;
    font-weight: 800;
  }
}
</style>
<script>
import { getCruDetail } from "@/api/roles";
import { Host } from "@/config";
export default {
  data() {
    return {
      Host: Host,
      cruinfo: {},
      permission: {},
      defaultProps: {
        label: "name",
      },
    };
  },
  async created() {
    this.id = this.$route.query.id;
    const {
      data: { person, permissions },
    } = await getCruDetail(this.id);
    this.cruinfo = person;
    this.permission = permissions;
  },
  methods: {
    goback() {
      this.$router.back()
    }
  },
};
</script>