<template>
  <div class="promote-setting">
    <el-card>
      <div class="switch-tabs">
        <el-button-group>
          <el-button plain :type="tab == 1 ? 'primary' : 'default'" @click="tab = 1">推广设置</el-button>
          <el-button plain :type="tab == 2 ? 'primary' : 'default'" @click="tab = 2">招募页设置</el-button>
          <el-button plain :type="tab == 3 ? 'primary' : 'default'" @click="tab = 3">个性化设置</el-button>
        </el-button-group>
      </div>
      <div class="switch-content">
        <promote-rules v-show="tab == 1" />
        <recru-setting v-show="tab == 2" />
        <personal-setting v-show="tab == 3" />
      </div>
    </el-card>
  </div>
</template>
<style lang="scss">
@import "~@/styles/color.scss";
.promote-setting {
  .el-card__body {
    padding: 0;
  }
  .switch-tabs {
    padding: 30px;
  }
  .switch-content {
    .section-title {
      padding: 0 30px;
      h3 {
        margin: 0 0 15px 0;
      }
    }
    .section-content {
      border-top: 0.5px solid #e1e1e1;
      padding: 30px;
      .sp-table {
        .el-form-item--medium {
          .el-form-item__content {
            margin-left: 10px !important;
          }
        }
      }
      .radio-item {
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .tips {
          font-size: 10px;
          color: #a1a1a1;
        }
      }
      .bind-type {
        display: flex;
        flex-direction: row;
        .bind-item {
          width: 200px;
          height: 180px;
          border-radius: 5px;
          border: 1px solid #e1e1e1;
          margin-right: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          h4 {
            margin: 8px 0;
          }
          p {
            margin: 5px 0;
            color: #a1a1a1;
          }
          .el-icon-success {
            color: #a1a1a1;
            font-size: 16px;
            position: absolute;
            top: 10px;
            right: 10px;
          }
        }
        .bind-item:hover {
          cursor: pointer;
        }
        .active {
          border: 1px solid $themeBlue;
          .el-icon-success {
            color: $themeBlue;
          }
        }
      }
    }
  }
}
.ps-dialog {
  .el-dialog__body {
    padding: 0;
    .zoom-in {
      padding: 30px;
      background-color: #f6f8fb;
      .img-container {
        width: 140px;
        height: 249px;
        background-color: #f2f2f2;
        border: 1px solid #e1e1e1;
      }
    }
  }
  .el-dialog__footer {
    padding: 0;
    .dialog-footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 15px 0;
    }
  }
}
</style>
<script>
import PromoteRules from './promoteRules'
import RecruSetting from './recruSetting'
import PersonalSetting from './personalSetting'
export default {
  components: {
    PromoteRules,
    RecruSetting,
    PersonalSetting
  },
  data() {
    return {
      tab: 1
    }
  },
  methods: {}
}
</script>
