<template>
  <div class="app-option">
    <div class="shop-management">
      <el-button type="primary" plain @click="manageShopNav">店铺导航管理</el-button>
      <el-button @click="showMangeSubject">店铺主题管理</el-button>
    </div>
    
    <div class="form-container">
      <h2>页面名称</h2>

      <!-- 直通车 start -->
      <div v-if="pageKey === 'home'">
        <home :option="option" />
      </div>
      <!-- 直通车 end -->

      <!-- 直通车 start -->
      <div v-if="pageKey === 'car'">
        <car-option :option="option" />
      </div>
      <!-- 直通车 end -->

      <!-- 好物分享 start -->
      <div v-if="pageKey === 'goods'">
        <haowu-option :option="option" />
      </div>
      <!-- 好物分享 end -->

      <!-- 消息中心 start -->
      <div v-if="pageKey === 'message'">
        <message :option="option" />
      </div>
      <!-- 消息中心 end -->

      <!-- 个人 start -->
      <div v-if="pageKey === 'me'">
        <me :option="option" />
      </div>
    </div>
  </div>
</template>

<script>
import Me from '@/views/layout/components/me'
import Home from '@/views/layout/components/home'
import Message from '@/views/layout/components/message'
import CarOption from '@/views/layout/components/carOption'
import HaowuOption from '@/views/layout/components/haowuOption'
import { getToken, getTokenType } from "@/utils/auth"
import formItem from "@/common/formItem.vue"
import { Host } from "@/config/index"
export default {
  name: "AppPageOption",
  components: {
    Me,
    Home,
    formItem,
    Message,
    CarOption,
    HaowuOption
  },
  props: {
    pageKey: {
      type: String,
      default: "",
    },
    option: {
      type: Object,
    },
  },
  created() {
    console.log(this.option);
  },
  data() {
    return {
      Host,
      token: getTokenType() + " " + getToken(),
    };
  },
  methods: {
    manageShopNav() {
      this.$bus.$emit("showManageShopNav");
    },
    showMangeSubject() {
      this.$bus.$emit("showManageSubject");
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '~@/styles/color.scss';
.app-option {
  width: 400px;
  // padding: 0 20px;
  overflow: auto;
  border-left: 1px solid #e8e8e8;
  h2 {
    color: #666;
    margin: 20px;
    font-size: 18px;
    font-weight: 900;
  }
  .brand-logo-upload {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .el-form {
    padding: 10px 25px 10px 25px;
    box-sizing: border-box;
    .section-title {
      margin-top: 50px;
      font-size: 16px;
      font-weight: 900;
      color: #999;
    }
    > h3 {
      // background-color: #f2f3f4;
      padding: 5px 10px;
      font-size: 14px;
    }
    .form-item-section {
      padding: 10px 0;
    }
    .el-form-item {
      .el-checkbox {
        display: block;
      }
      .check-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .check-item-text {
          width: 100px;
          height: 30px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 900;
          color: #999;
        }
      }
    }
    .el-form-item.small {
      margin-bottom: 5px;
      .font-set {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        cursor: pointer;
        &.checked {
          color: #fff;
          background-color: #333;
        }
      }
      .el-date-editor.el-input {
        width: 186px;
        .el-input__inner {
          padding-left: 30px !important;
        }
      }
      .el-input__inner {
        padding: 0 10px;
      }
      .el-textarea__inner {
        padding: 5px 10px;
      }
      .el-form-item__label {
        padding-right: 0;
      }
    }
  }
}
</style>
